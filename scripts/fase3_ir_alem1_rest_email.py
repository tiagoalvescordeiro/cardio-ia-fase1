"""
CardioIA - Fase 3 - Ir Além 1
Simulação de API REST, Lógica de Risco e Disparo de E-mail

Objetivo:
- Consumir e enviar dados de sinais vitais via API REST.
- Incorporar lógica de detecção de riscos (taquicardia, febre, ausência de movimento).
- Simular automação de disparo de e-mail.
"""

import json
import time
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.request
import urllib.error

# Configurações
HOST = 'localhost'
PORT = 8080
ENDPOINT = f"http://{HOST}:{PORT}/api/vitals"

# --- MÓDULO DE AUTOMAÇÃO DE E-MAIL ---
def enviar_alerta_email(paciente_id, alertas, dados):
    """
    Simula o disparo de um e-mail de emergência via SMTP.
    """
    print("\n" + "="*50)
    print("🚨 [SISTEMA RPA] INICIANDO AUTOMAÇÃO DE E-MAIL 🚨")
    print("Conectando ao servidor SMTP (simulado)... OK")
    print("Montando payload do e-mail...")
    
    corpo_email = f"""
    Para: equipe.medica@cardioia.com.br
    Assunto: ALERTA CRÍTICO - Paciente {paciente_id}
    
    Atenção Equipe Médica,
    O sistema detectou anomalias críticas nos sinais vitais do paciente {paciente_id}.
    
    Sinais de Risco Encontrados:
    {chr(10).join([f" - {a}" for a in alertas])}
    
    Dados da Última Leitura:
    - BPM: {dados.get('bpm')}
    - Temperatura: {dados.get('temperatura')} °C
    - Movimento detectado: {'Sim' if dados.get('movimento') else 'Não'}
    
    Por favor, verificar imediatamente.
    """
    time.sleep(1) # Simulando delay de rede
    print("E-mail enviado com sucesso!")
    print(corpo_email)
    print("="*50 + "\n")

# --- MÓDULO DE VERIFICAÇÃO DE RISCO ---
def verificar_riscos(dados):
    """
    Aplica a lógica de negócios para detecção de anomalias na saúde.
    """
    alertas = []
    
    bpm = dados.get('bpm', 0)
    temp = dados.get('temperatura', 0.0)
    movimento = dados.get('movimento', True)
    
    # Regras clínicas simplificadas
    if bpm > 120:
        alertas.append("Taquicardia detectada (BPM > 120)")
    elif bpm < 50:
        alertas.append("Bradicardia detectada (BPM < 50)")
        
    if temp >= 38.0:
        alertas.append("Quadro febril detectado (Temp >= 38°C)")
        
    if not movimento:
        alertas.append("Ausência de movimento detectada prolongada")
        
    if alertas:
        enviar_alerta_email(dados.get('paciente_id', 'Desconhecido'), alertas, dados)
    else:
        print(f"✅ Paciente {dados.get('paciente_id')}: Sinais estáveis. Nenhum risco detectado.")

# --- MÓDULO DE API REST (SERVIDOR) ---
class VitalsRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/vitals':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                dados = json.loads(post_data.decode('utf-8'))
                print(f"\n[API REST] Dados recebidos com sucesso: {dados}")
                
                # Aciona de forma assíncrona/desacoplada a verificação de risco
                verificar_riscos(dados)
                
                # Responde sucesso ao cliente
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Dados processados"}).encode())
                
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"Bad Request")
        else:
            self.send_response(404)
            self.end_headers()

def iniciar_servidor():
    server = HTTPServer((HOST, PORT), VitalsRequestHandler)
    print(f"Servidor REST mock rodando na porta {PORT}...")
    server.serve_forever()

# --- MÓDULO CLIENTE (DISPOSITIVO EDGE SIMULADO) ---
def enviar_dados_paciente(dados):
    """
    Consome a API REST enviando o JSON com os sinais vitais via POST.
    """
    req = urllib.request.Request(ENDPOINT, method="POST")
    req.add_header('Content-Type', 'application/json')
    jsondata = json.dumps(dados).encode('utf-8')
    req.add_header('Content-Length', len(jsondata))
    
    print(f"\n[CLIENTE] Transmitindo dados via POST para {ENDPOINT} ...")
    try:
        response = urllib.request.urlopen(req, jsondata)
        resp_body = json.loads(response.read().decode('utf-8'))
        print(f"[CLIENTE] Resposta da API: {resp_body['status']} - {resp_body['message']}")
    except Exception as e:
        print(f"[CLIENTE] Erro ao enviar dados: {e}")

# --- EXECUÇÃO PRINCIPAL ---
if __name__ == "__main__":
    # Inicia o servidor REST em uma thread separada
    server_thread = threading.Thread(target=iniciar_servidor, daemon=True)
    server_thread.start()
    
    # Aguarda o servidor subir
    time.sleep(1)
    
    print("\n--- SIMULADOR DE MONITORAMENTO CONTÍNUO INICIADO ---")
    
    # Cenário 1: Paciente Normal
    paciente_normal = {
        "paciente_id": "P001",
        "bpm": 75,
        "temperatura": 36.5,
        "movimento": True
    }
    enviar_dados_paciente(paciente_normal)
    time.sleep(2)
    
    # Cenário 2: Paciente com Risco (Taquicardia e Febre)
    paciente_risco_1 = {
        "paciente_id": "P002",
        "bpm": 135,
        "temperatura": 38.2,
        "movimento": True
    }
    enviar_dados_paciente(paciente_risco_1)
    time.sleep(2)
    
    # Cenário 3: Paciente com Risco (Sem movimento e Bradicardia)
    paciente_risco_2 = {
        "paciente_id": "P003",
        "bpm": 45,
        "temperatura": 35.8,
        "movimento": False
    }
    enviar_dados_paciente(paciente_risco_2)
    time.sleep(2)
    
    print("\n--- SIMULAÇÃO FINALIZADA ---")
