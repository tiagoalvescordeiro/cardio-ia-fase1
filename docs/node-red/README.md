# Node-RED — dashboard CardioIA

## Pré-requisitos

- Node-RED instalado ([documentação oficial](https://nodered.org/docs/getting-started/local)).  
- Pacote **node-red-dashboard**: na pasta do seu perfil Node-RED execute  
  `npm install node-red-dashboard`  
  reinicie o Node-RED e confirme que o conjunto **dashboard** aparece na paleta.

## Importar o fluxo

1. Abra o editor Node-RED.  
2. Menu **⋮** → **Importar** → cole o conteúdo de [`flows.json`](./flows.json) (ou importe o arquivo).  
3. Faça **Implantar (Deploy)**.  
4. Acesse a UI em `http://localhost:1880/ui` (porta padrão) — o separador **Monitoramento** deve aparecer.

## MQTT

O fluxo usa o broker configurado em **mqtt-broker** (`broker.hivemq.com:1883`) e assina `cardioia/grupo54/telemetria`, o mesmo tópico publicado pelo firmware em [`../../wokwi/sketch.ino`](../../wokwi/sketch.ino).

## Alertas (rubrica)

- **BPM** > 120 → texto de alerta na área **Status**.  
- **Temperatura** > 38 °C → texto de alerta na área **Status**.

Ajuste os limiares no nó **function** `parse + alertas` se o professor pedir outros valores.

## Evidência para entrega

Capture **prints** da UI com o simulador Wokwi publicando dados e salve em `assets/evidencias/` (ex.: `dashboard_mqtt.png`).
