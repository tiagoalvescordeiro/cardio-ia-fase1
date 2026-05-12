# Node-RED — *dashboard* CardioIA (Fase 3)

## Pré-requisitos

- Node-RED instalado ([documentação oficial](https://nodered.org/docs/getting-started/local)).  
- Pacote **node-red-dashboard**: no diretório do perfil Node-RED, executar  
  `npm install node-red-dashboard`  
  Reiniciar o Node-RED e confirmar o conjunto **dashboard** na paleta.

## Importar o fluxo

1. Abrir o editor Node-RED.  
2. Menu **⋮** → **Importar** → colar o conteúdo de [`flows.json`](./flows.json) (ou importar o arquivo).  
3. **Implantar (Deploy)**.  
4. Abrir a UI em `http://localhost:1880/ui` (porta padrão). O separador **Monitoramento** deve aparecer.

## MQTT

O fluxo referencia o broker **mqtt-broker** (`broker.hivemq.com:1883`) e assina `cardioia/grupo54/telemetria`, o mesmo tópico publicado em [`../../wokwi/sketch.ino`](../../wokwi/sketch.ino).

## Limiares de alerta

- **BPM** > 120 → mensagem na área **Status**.  
- **Temperatura** > 38 °C → mensagem na área **Status**.

Os limiares podem ser ajustados no nó **function** `parse + alertas`, conforme critérios do trabalho ou orientação docente.

## Evidências

Capturar **capturas de tela** da UI com o Wokwi a publicar dados e arquivar em `assets/evidencias/` (ex.: `dashboard_mqtt.png`), em complemento ao `flows.json`.
