# Relatório — Parte 2: Nuvem (MQTT) e visualização (Node-RED)

**Disciplina / projeto:** CardioIA — Fase 3 (FIAP)  
**Autores:** _(grupo)_  
**Data:** _(preencher)_

## 1. Objetivo

Documentar o fluxo **ESP32 → broker MQTT → Node-RED**, tópicos utilizados, formato do payload e o **dashboard** (gráfico, gauge, alertas).

## 2. MQTT

- **Broker:** _(ex.: HiveMQ Cloud — sem publicar senha neste arquivo)_.  
- **Tópicos:** _(ex.: `cardioia/grupoXX/temperatura`, `.../bpm`)_.  
- **QoS / retain:** _(se usado)_.  
- **Segurança:** TLS, credenciais fora do repositório, variáveis no firmware.

## 3. Node-RED

- **Nós principais:** MQTT in, funções, `ui_chart`, `ui_gauge`, `ui_notification` ou LED virtual.  
- **Gráfico:** qual sinal vital (ex.: temperatura + simulação de BPM).  
- **Gauge:** qual parâmetro.  
- **Alertas:** limites (ex.: BPM > 120, temperatura > 38 °C) e como são exibidos.

## 4. Grafana (opcional)

Se utilizado: o que foi conectado, datasource, e link ou print de referência (também em `assets/evidencias/`).

## 5. Evidências

Referencie prints e export JSON em:

- `assets/evidencias/`  
- `docs/node-red/` _(arquivo `.json` exportado)_
