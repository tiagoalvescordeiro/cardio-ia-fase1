# CardioIA - Fase 3: Ir Além 1
## Comunicação Automatizada com REST e E-mail

### 1. Objetivo
Simular um sistema de monitoramento que consuma e envie dados de sinais vitais via uma API REST em Python. O sistema incorpora lógica de detecção de riscos críticos de saúde e aciona uma automação de envio de e-mail em caso de alerta, conectando os conceitos de IoT e automação.

### 2. Arquitetura do Fluxo
A implementação foi desenvolvida inteiramente em Python nativo (bibliotecas `http.server`, `urllib`, e `json`), sem dependências externas, garantindo fácil replicação. O fluxo funciona da seguinte forma:

1. **Cliente REST (Borda/Dispositivo):** Um módulo cliente empacota dados vitais de um paciente simulado (BPM, temperatura, estado de movimento) em formato JSON e envia via requisição HTTP POST para o endpoint `/api/vitals` do servidor.
2. **Servidor REST (Nuvem/Fog):** Uma thread dedicada hospeda um servidor HTTP mock (na porta 8080 local) que escuta por requisições de entrada.
3. **Verificação de Risco (Regras de Negócio):** Quando a API recebe o payload JSON, os dados são extraídos e processados por uma função de triagem que analisa:
    - **Taquicardia:** Disparado se `bpm > 120`.
    - **Bradicardia:** Disparado se `bpm < 50`.
    - **Quadro Febril:** Disparado se `temperatura >= 38.0`.
    - **Ausência de Movimento:** Disparado se o sensor de presença acusar `False`.
4. **Automação de E-mail (RPA Simulada):** Se uma ou mais anomalias forem detectadas, o fluxo invoca uma função de notificação que gera um payload de e-mail e simula sua transmissão via servidor SMTP (impresso formatado no console para fins de demonstração).

### 3. Evidências de Execução
Ao executar o script `scripts/fase3_ir_alem1_rest_email.py`, o sistema demonstra três cenários distintos:
- **Cenário Normal:** Um paciente apresenta sinais saudáveis (BPM=75, Temp=36.5°C). O servidor retorna HTTP 200 e imprime *Sinais estáveis. Nenhum risco detectado.*
- **Cenário de Crise 1:** Um paciente simula taquicardia (BPM=135) e febre (Temp=38.2°C). A automação dispara imediatamente um alerta simulado de e-mail para a `equipe.medica@cardioia.com.br`.
- **Cenário de Crise 2:** Um paciente simula bradicardia severa e imobilidade, demonstrando que múltiplas condições simultâneas também acumulam os alertas dentro do mesmo corpo de e-mail disparado.

### 4. Conclusões
O sistema cumpre os requisitos propostos do *"Ir Além 1"*, demonstrando as capacidades da linguagem Python para interconectar protocolos web, processamento lógico de dados de saúde e mecanismos de resposta rápida por alertas, estabelecendo uma fundação inicial para aplicações corporativas médicas avançadas baseadas em microsserviços.
