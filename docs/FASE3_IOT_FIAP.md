# Fase 3 (FIAP ON — *Além das Fronteiras Digitais*) — **Cap 1: CardioIA Conectada: IoT e Visualização de Dados para a Saúde Digital**

Atividade referente ao enunciado **«FASE 3: Monitoramento Contínuo – IoT na Saúde»** (ESP32, Wokwi, MQTT, Node-RED, resiliência *offline*), alinhada ao objetivo da fase no **FIAP ON** (*Além das Fronteiras Digitais*): integração de IA, IoT e sistemas na **CardioIA**, com *dashboards*, governança de dados e impacto social (telemetria simulada; sem dados identificáveis de pacientes).

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

- Código Wokwi, fluxo Node-RED, relatórios Parte 1 e 2, `links.md` e diagrama `assets/evidencias/arquitetura_fase3.svg`: **versionados no `main`**.  
- **Export do dashboard Node-RED:** [`node-red/flows.json`](node-red/flows.json) (atende ao enunciado: *prints **ou** export*).  
- **Link Share Wokwi:** **https://wokwi.com/projects/463138220013169665** (também em [`links.md`](../links.md) e em [`TEXTO_ENTREGA_MOODLE.txt`](TEXTO_ENTREGA_MOODLE.txt)). Confirme no Wokwi que o sketch/diagrama coincidem com o GitHub após qualquer edição local.  
- **Prints PNG** (serial Wokwi, aba `/ui` do Node-RED): **recomendados** na pasta `assets/evidencias/` para facilitar a correção, em complemento ao `flows.json`.

## Checklist rápido — Moodle (Cap 1 / Fase 3)

Antes do prazo (**até 12/05/2026** no calendário FIAP ON — conferir no *dashboard*):

1. Repositório público GitHub com `wokwi/` e `docs/` atualizados.  
2. **URL Share do Wokwi** obtido e informado (Moodle + `links.md`).  
3. **Export** Node-RED: já está em `docs/node-red/flows.json`; opcionalmente anexar o mesmo arquivo no Moodle, se houver campo de upload.  
4. **Relatórios** Parte 1 e Parte 2: links no README / `docs/`.  
5. (Recomendado) 1–2 **imagens** em `assets/evidencias/` com commit final.
