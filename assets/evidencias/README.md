# Evidências (capturas de tela / export)

## Arquivos já versionados

- **`arquitetura_fase3.svg`** — diagrama Edge → MQTT → Node-RED.  
- **`wokwi_projeto_publico_url.png`** — evidência do URL público do Wokwi.  
- **`node_red_flows_github_export.png`** — evidência do `flows.json` no GitHub.

## Recomendações adicionais

A Fase 3 pode ser documentada com **capturas da aplicação** ou com **export do *dashboard***; o export está em [`../../docs/node-red/flows.json`](../../docs/node-red/flows.json). Mesmo assim, **PNG** ajudam a mostrar o sistema em execução.

Sugestão de evidências:

1. **Wokwi** em execução com saída relevante no Monitor Serial (fila e modo simulado).  
2. **Node-RED / Dashboard** (`/ui`) com gráficos e alerta acionado.  
3. (Opcional) Cliente MQTT mostrando mensagens em `cardioia/grupo54/telemetria`.

Nomes sugeridos: `wokwi_serial.png`, `dashboard_ui.png`, `mqtt_explorer.png`.
