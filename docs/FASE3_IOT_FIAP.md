# Fase 3 — *Além das Fronteiras Digitais* — **CardioIA Conectada: IoT e Visualização de Dados para a Saúde Digital**

Implementação do módulo **Monitoramento contínuo com IoT na saúde**: ESP32 (Wokwi), MQTT, Node-RED e comportamento **offline** com sincronização quando a ligação volta. Objetivo do projeto **CardioIA**: telemetria simulada, dashboard e documentação, sem dados identificáveis de pacientes.

## O que foi implementado e onde está

| Objetivo técnico | Artefato |
|------------------|----------|
| Projeto Wokwi (ESP32, ≥2 sensores, **DHT22** obrigatório) | [`wokwi/diagram.json`](../wokwi/diagram.json), [`wokwi/sketch.ino`](../wokwi/sketch.ino), [`wokwi/README.md`](../wokwi/README.md) |
| Código C++ comentado | `wokwi/sketch.ino` |
| Resiliência offline (fila + envio ao “reconectar”) | Fila em RAM no sketch (`enqueueSample`, `flushQueueIfOnline`) + variável `g_wifiSimuladoConectado` |
| Simulação de conectividade Wi-Fi | Alternância periódica da variável + uso de `Wokwi-GUEST` quando na nuvem |
| MQTT para nuvem | `PubSubClient` → `broker.hivemq.com`, tópico `cardioia/grupo54/telemetria` |
| Dashboard Node-RED (gráfico, gauge, alerta) | [`node-red/flows.json`](node-red/flows.json) + instruções em [`node-red/README.md`](node-red/README.md) |
| Relatório Parte 1 (edge) | [`relatorio_parte1_edge.md`](relatorio_parte1_edge.md) |
| Relatório Parte 2 (MQTT + dashboard) | [`relatorio_parte2_mqtt_dashboard.md`](relatorio_parte2_mqtt_dashboard.md) |
| Grafana (opcional) | Não incluído — podem acrescentar capturas em `assets/evidencias/` se no futuro existir Grafana |

## SPIFFS e simulador

No Wokwi, **SPIFFS** é limitado para este cenário; optamos por **fila em RAM** e **Monitor Serial** para mostrar o comportamento na borda (*edge*) sem depender de arquivo persistente no simulador.

## Curso

Disciplina no formato **EAD (FIAP)**.

## Estado do repositório

- Código Wokwi, fluxo Node-RED, relatórios Parte 1 e 2, `links.md` e diagrama `assets/evidencias/arquitetura_fase3.svg` na branch **`main`**.  
- **Export do dashboard Node-RED:** [`node-red/flows.json`](node-red/flows.json) (capturas de ecrã ou export — o export está no repositório).  
- **Projeto Wokwi (partilha):** https://wokwi.com/projects/463138220013169665 (também em [`links.md`](../links.md) e em [`TEXTO_ENTREGA_MOODLE.txt`](TEXTO_ENTREGA_MOODLE.txt)). Vale a pena confirmar no Wokwi que `sketch.ino` e `diagram.json` coincidem com o GitHub após alterações locais.  
- **Capturas PNG** (serial no Wokwi, `/ui` no Node-RED): úteis em `assets/evidencias/` para documentar a execução, além do `flows.json`.

## Lista de verificação (envio do trabalho)

1. Repositório GitHub público com `wokwi/` e `docs/` atualizados.  
2. **URL de partilha do Wokwi** registado onde a disciplina pedir (e em `links.md`).  
3. **Export** Node-RED em `docs/node-red/flows.json`; anexar o mesmo arquivo no sistema de entrega, se existir campo para upload.  
4. **Relatórios** Parte 1 e Parte 2 acessíveis a partir do README / `docs/`.  
5. (Opcional) Capturas adicionais em `assets/evidencias/` com o commit final.
