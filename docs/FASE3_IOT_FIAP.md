# Fase 3 (FIAP) — Cap 1: CardioIA Conectada — IoT e visualização de dados

Atividade alinhada ao enunciado **“FASE 3: Monitoramento Contínuo – IoT na Saúde”** (ESP32, Wokwi, MQTT, Node-RED, resiliência offline).

## Mapeamento enunciado → artefatos neste repositório

| Requisito (enunciado) | Artefato entregue |
|------------------------|-------------------|
| Projeto Wokwi (ESP32, ≥2 sensores, **DHT22** obrigatório) | [`wokwi/diagram.json`](../wokwi/diagram.json), [`wokwi/sketch.ino`](../wokwi/sketch.ino), [`wokwi/README.md`](../wokwi/README.md) |
| Código C++ comentado | `wokwi/sketch.ino` |
| Resiliência offline (fila + sync ao “reconectar”) | Implementação em RAM no sketch (`enqueueSample`, `flushQueueIfOnline`) + variável `g_wifiSimuladoConectado` |
| Simulação de conectividade Wi-Fi | Alternância periódica da variável + uso de `Wokwi-GUEST` quando na nuvem |
| MQTT para nuvem | `PubSubClient` → `broker.hivemq.com`, tópico `cardioia/grupo54/telemetria` |
| Dashboard Node-RED (gráfico, gauge, alerta) | [`node-red/flows.json`](node-red/flows.json) + instruções em [`node-red/README.md`](node-red/README.md) |
| Relatório Parte 1 (≥1 página) | [`relatorio_parte1_edge.md`](relatorio_parte1_edge.md) |
| Relatório Parte 2 (≥2 páginas) | [`relatorio_parte2_mqtt_dashboard.md`](relatorio_parte2_mqtt_dashboard.md) |
| Grafana (opcional) | Não obrigatório — pode acrescentar prints em `assets/evidencias/` se o grupo implementar |

## Observação (SPIFFS / simulador)

O enunciado reconhece limitação de **SPIFFS** no simulador; a estratégia adotada foi **fila em RAM** + **Monitor Serial** para evidenciar o comportamento de borda (edge) sem depender de arquivo físico no Wokwi.

## EAD / localização (verificação institucional)

Curso **on-line (FIAP)** — se solicitado, anexar comprovante de matrícula EAD junto à entrega na plataforma.

## Status da entrega (repositório)

- Código Wokwi, fluxo Node-RED, relatórios Parte 1 e 2, `links.md` e diagrama de arquitetura em `assets/evidencias/arquitetura_fase3.svg`: **versionados no `main`**.  
- **Link Share** numerado do site Wokwi (`wokwi.com/projects/...`): opcional; a correção pode reproduzir pelo GitHub + arquivos **raw** indicados em `links.md`.  
- **Prints PNG** da simulação e do dashboard: acrescentar em `assets/evidencias/` apenas se o professor exigir explicitamente.
