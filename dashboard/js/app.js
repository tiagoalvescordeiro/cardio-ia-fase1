/**
 * CardioIA Dashboard - Control Logic
 */

let activePatientId = null;
let chartInstance = null;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', async () => {
    // Nav Menu Handlers
    document.querySelectorAll('.nav-item').forEach(el => {
        el.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const targetView = e.currentTarget.getAttribute('data-view');
            document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
            document.getElementById(targetView).classList.add('active');
            
            if (targetView === 'email-view') loadEmailLog();
        });
    });

    // Setup initial data
    await renderPatientsList();
    
    // Select first patient by default
    const firstPatient = window.api.patients[0];
    if (firstPatient) {
        selectPatient(firstPatient.id);
    }

    // Start simulation clock (1 tick per second)
    setInterval(updateSimulationTick, 1000);
});

// Real-time Event Listener for Emails
document.addEventListener('newEmailAlert', (e) => {
    const email = e.detail;
    // Show toast or highlight
    const badge = document.querySelector('.status-badge');
    badge.innerHTML = `<div class="pulse"></div> NOVO ALERTA ENVIADO (PACIENTE ${email.patientId})`;
    badge.classList.add('critical');
    setTimeout(() => {
        if (!window.api.patients.find(p => p.id === activePatientId)?.risk) {
            badge.innerHTML = `<div class="pulse"></div> MONITORAMENTO ATIVO`;
            badge.classList.remove('critical');
        }
    }, 4000);
    
    // If in email view, refresh
    if (document.getElementById('email-view').classList.contains('active')) {
        loadEmailLog();
    }
});

async function renderPatientsList() {
    const patients = await window.api.getPatients();
    const container = document.getElementById('patients-list');
    container.innerHTML = '';
    
    patients.forEach(p => {
        const lastBpm = window.api.telemetry[p.id].bpm.slice(-1)[0].y;
        const el = document.createElement('div');
        el.className = `patient-card ${p.id === activePatientId ? 'active-patient' : ''} ${p.risk ? 'alert' : ''}`;
        el.id = `card-${p.id}`;
        el.innerHTML = `
            <div class="p-info">
                <h4>${p.name}</h4>
                <p>ID: ${p.id} | ${p.age} anos</p>
            </div>
            <div class="p-vitals">
                <div class="bpm">${lastBpm.toFixed(0)} <span style="font-size:0.7em">BPM</span></div>
            </div>
        `;
        el.addEventListener('click', () => selectPatient(p.id));
        container.appendChild(el);
    });
}

function updatePatientsListUI() {
    window.api.patients.forEach(p => {
        const card = document.getElementById(`card-${p.id}`);
        if (!card) return;
        
        const lastBpm = window.api.telemetry[p.id].bpm.slice(-1)[0].y;
        card.querySelector('.bpm').innerHTML = `${lastBpm.toFixed(0)} <span style="font-size:0.7em">BPM</span>`;
        
        if (p.risk) card.classList.add('alert');
        else card.classList.remove('alert');
        
        if (p.id === activePatientId) {
            card.classList.add('active-patient');
            // Update global badge
            const badge = document.querySelector('.status-badge');
            if (p.risk) {
                badge.classList.add('critical');
                badge.innerHTML = `<div class="pulse" style="background:#ef4444"></div> PACIENTE CRÍTICO`;
            } else {
                badge.classList.remove('critical');
                badge.innerHTML = `<div class="pulse"></div> MONITORAMENTO ATIVO`;
            }
        } else {
            card.classList.remove('active-patient');
        }
    });
}

async function selectPatient(id) {
    activePatientId = id;
    const patient = window.api.patients.find(p => p.id === id);
    document.getElementById('current-patient-name').innerText = `Monitorando: ${patient.name} (${id})`;
    
    updatePatientsListUI();
    await updateChart(id);
}

async function updateChart(patientId) {
    const data = await window.api.getTelemetry(patientId);
    
    const ctx = document.getElementById('vitalsChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.data.labels = data.bpm.map(d => new Date(d.t).toLocaleTimeString());
        chartInstance.data.datasets[0].data = data.bpm.map(d => d.y);
        chartInstance.data.datasets[1].data = data.temp.map(d => d.y);
        chartInstance.update('none'); // Update without animation for smooth streaming
    } else {
        Chart.defaults.color = '#94a3b8';
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.bpm.map(d => new Date(d.t).toLocaleTimeString()),
                datasets: [
                    {
                        label: 'Frequência Cardíaca (BPM)',
                        data: data.bpm.map(d => d.y),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Temperatura (°C)',
                        data: data.temp.map(d => d.y),
                        borderColor: '#3b82f6',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { maxTicksLimit: 10 }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 30, max: 200,
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min: 34, max: 42,
                        grid: { drawOnChartArea: false }
                    }
                },
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }
}

async function loadEmailLog() {
    const emails = await window.api.getEmails();
    const container = document.getElementById('email-log-container');
    container.innerHTML = '';
    
    if (emails.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted)">Nenhum e-mail de alerta enviado ainda. O sistema está aguardando anomalias...</p>`;
        return;
    }
    
    emails.forEach(e => {
        const div = document.createElement('div');
        div.className = 'email-item ' + e.status;
        div.innerHTML = `
            <div class="email-meta">
                <span><strong>Para:</strong> ${e.to}</span>
                <span>${new Date(e.timestamp).toLocaleString()}</span>
            </div>
            <div style="margin-bottom:0.75rem"><strong>Assunto:</strong> ${e.subject}</div>
            <div class="email-body">${e.body}</div>
        `;
        container.appendChild(div);
    });
}

// Tick Simulation Engine
async function updateSimulationTick() {
    window.api.generateNextTick();
    updatePatientsListUI();
    if (activePatientId) {
        updateChart(activePatientId);
        updateLIFUI(activePatientId);
    }
}

async function updateLIFUI(patientId) {
    const data = await window.api.getTelemetry(patientId);
    const pot = data.current_lif || 0;
    const max = 5.0;
    const pct = Math.min(100, (pot / max) * 100);
    
    const bar = document.getElementById('lif-progress');
    const valText = document.getElementById('lif-val');
    
    bar.style.width = `${pct}%`;
    valText.innerText = `${pot.toFixed(2)} / ${max.toFixed(2)}`;
    
    // Cores dinâmicas
    bar.classList.remove('warning', 'danger');
    if (pot > 4.0) bar.classList.add('danger');
    else if (pot > 2.5) bar.classList.add('warning');
}

// Manual Triggers
function triggerManualAlert(type) {
    if (!activePatientId) return;
    
    if (type === 'bpm') window.api.triggerTachycardia(activePatientId);
    else if (type === 'temp') window.api.triggerFever(activePatientId);
    
    // Visual feedback on button (optional)
    console.log(`[SIM] Triggered ${type} for ${activePatientId}`);
}

// CSV Export Logic
async function exportActivePatientCSV() {
    if (!activePatientId) return;
    
    const patient = window.api.patients.find(p => p.id === activePatientId);
    const data = await window.api.getTelemetry(activePatientId);
    
    let csv = "Timestamp,Data_Hora,BPM,Temperatura_C\n";
    
    data.bpm.forEach((point, i) => {
        const tempPoint = data.temp[i];
        const dateStr = new Date(point.t).toLocaleString();
        csv += `${point.t},"${dateStr}",${point.y.toFixed(2)},${tempPoint.y.toFixed(2)}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `telemetria_${activePatientId}_${patient.name.replace(/ /g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
