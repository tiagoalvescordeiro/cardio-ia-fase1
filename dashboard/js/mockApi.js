/**
 * CardioIA Mock API
 * Simula um backend estruturado para o Dashboard Web
 */

class MockAPI {
    constructor() {
        this.patients = [
            { id: 'P001', name: 'João Silva', age: 64, status: 'stable', risk: 0 },
            { id: 'P002', name: 'Maria Santos', age: 72, status: 'stable', risk: 0 },
            { id: 'P003', name: 'Carlos Oliveira', age: 58, status: 'stable', risk: 0 },
        ];
        
        // Séries temporais (últimas 60 amostras)
        this.telemetry = {
            'P001': { bpm: [], temp: [], lif_potential: 0 },
            'P002': { bpm: [], temp: [], lif_potential: 0 },
            'P003': { bpm: [], temp: [], lif_potential: 0 }
        };
        
        this.emailLog = [];
        
        // Inicializa dados base
        this.initTelemetry();
    }
    
    initTelemetry() {
        const now = Date.now();
        this.patients.forEach(p => {
            for(let i=60; i>0; i--) {
                this.telemetry[p.id].bpm.push({
                    t: now - (i * 1000),
                    y: 70 + Math.random() * 10
                });
                this.telemetry[p.id].temp.push({
                    t: now - (i * 1000),
                    y: 36.5 + Math.random() * 0.5
                });
            }
        });
    }

    async getPatients() {
        return new Promise(resolve => setTimeout(() => resolve(this.patients), 200));
    }

    async getTelemetry(patientId) {
        return new Promise(resolve => setTimeout(() => {
            const data = {...this.telemetry[patientId]};
            data.current_lif = this.telemetry[patientId].lif_potential;
            resolve(data);
        }, 100));
    }

    triggerTachycardia(patientId) {
        const lastIdx = this.telemetry[patientId].bpm.length - 1;
        this.telemetry[patientId].bpm[lastIdx].y += 60;
        this.patients.find(p => p.id === patientId).status = 'critical';
    }

    triggerFever(patientId) {
        const lastIdx = this.telemetry[patientId].temp.length - 1;
        this.telemetry[patientId].temp[lastIdx].y += 2.5;
        this.patients.find(p => p.id === patientId).status = 'critical';
    }

    async getEmails() {
        return new Promise(resolve => setTimeout(() => resolve(this.emailLog), 200));
    }

    // Método principal de simulação: gera o próximo "tick" de tempo para cada paciente
    generateNextTick() {
        const now = Date.now();
        const alerts = [];
        
        const LIF_THRESHOLD = 5.0;
        const LIF_DECAY = 0.8;

        this.patients.forEach(p => {
            let lastBpm = this.telemetry[p.id].bpm[this.telemetry[p.id].bpm.length - 1].y;
            let lastTemp = this.telemetry[p.id].temp[this.telemetry[p.id].temp.length - 1].y;
            
            // Random walk normal
            let nextBpm = lastBpm + (Math.random() - 0.5) * 4;
            let nextTemp = lastTemp + (Math.random() - 0.5) * 0.1;
            
            // Força a voltar ao normal lentamente
            nextBpm += (75 - nextBpm) * 0.05;
            nextTemp += (36.5 - nextTemp) * 0.05;

            // Injeta anomalias esporádicas
            if (Math.random() < 0.01) { 
                if (Math.random() < 0.5) nextBpm += 40;
                else nextTemp += 1.5;
            }

            // --- Lógica LIF Real-time ---
            let stim = Math.max(0, nextBpm - 75);
            let pot = (this.telemetry[p.id].lif_potential * LIF_DECAY) + (stim * 0.1);
            
            if (pot >= LIF_THRESHOLD) {
                pot = 0; // Spike! (Reset)
                // O spike pode ser usado para forçar um alerta se ainda não houver
            }
            this.telemetry[p.id].lif_potential = pot;

            // Atualiza fila (mantém 60 max)
            this.telemetry[p.id].bpm.shift();
            this.telemetry[p.id].bpm.push({ t: now, y: nextBpm });
            
            this.telemetry[p.id].temp.shift();
            this.telemetry[p.id].temp.push({ t: now, y: nextTemp });

            // Verifica risco clínico para RPA
            const patientAlerts = [];
            if (nextBpm > 120) patientAlerts.push(`Taquicardia (BPM: ${nextBpm.toFixed(0)})`);
            if (nextTemp >= 38.0) patientAlerts.push(`Febre (Temp: ${nextTemp.toFixed(1)}°C)`);
            
            if (patientAlerts.length > 0) {
                p.risk = 1;
                p.status = 'critical';
                alerts.push({ patient: p, conditions: patientAlerts });
            } else {
                p.risk = 0;
                if (nextBpm < 100 && nextTemp < 37.8) p.status = 'stable';
            }
        });

        // Simula disparo de E-mails via RPA para os alertas gerados
        alerts.forEach(al => this._triggerEmailRPA(al.patient, al.conditions));
    }

    _triggerEmailRPA(patient, conditions) {
        // Evita spam (só manda se não mandou nos últimos 10s para esse paciente)
        const lastSent = this.emailLog.find(e => e.patientId === patient.id);
        if (lastSent && (Date.now() - lastSent.timestamp < 10000)) return;

        const emailBody = `URGENTE: Anomalia detectada
Paciente: ${patient.name} (${patient.id})
Condições Clínicas Identificadas:
${conditions.map(c => `- ${c}`).join('\n')}

Por favor, verificar paciente imediatamente na unidade.
(Mensagem gerada via CardioIA RPA Edge)`;

        const emailRecord = {
            id: 'EML_' + Math.floor(Math.random()*100000),
            patientId: patient.id,
            timestamp: Date.now(),
            to: 'equipe.medica@cardioia.com.br',
            subject: `ALERTA CRÍTICO - ${patient.id}`,
            body: emailBody,
            status: 'sent'
        };

        this.emailLog.unshift(emailRecord);
        if(this.emailLog.length > 50) this.emailLog.pop(); // Keep log small
        
        // Dispara evento customizado para a UI se atualizar
        document.dispatchEvent(new CustomEvent('newEmailAlert', { detail: emailRecord }));
    }
}

// Exporta globalmente
window.api = new MockAPI();
