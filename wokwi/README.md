# Simulação Wokwi — CardioIA Fase 3 (FIAP)

## Conteúdo

| Arquivo | Função |
|---------|--------|
| `diagram.json` | Montagem: ESP32 DevKit v1, **DHT22** (temperatura + umidade) e **botão** (simula variação de BPM). |
| `sketch.ino` | Firmware: leitura periódica, fila em RAM quando “offline simulado”, **MQTT** para `broker.hivemq.com` quando “online”. |
| `libraries.txt` | Dependências Arduino no Wokwi. |

## Como abrir no Wokwi

1. Acesse [https://wokwi.com](https://wokwi.com) e crie **Novo projeto** → **ESP32** → **Arduino**.  
2. Substitua o conteúdo de `diagram.json` e `sketch.ino` pelos arquivos desta pasta (ou importe o repositório GitHub se a opção estiver disponível).  
3. Confirme que as bibliotecas **PubSubClient** e **DHT sensor library** (+ **Adafruit Unified Sensor**) foram instaladas (Wokwi costuma ler `libraries.txt`).  
4. **Run** — o Monitor Serial deve mostrar alternância de modo simulado e fila; com Wi‑Fi virtual `Wokwi-GUEST` o MQTT publica em `cardioia/grupo54/telemetria`. Com o diagrama em foco, a tecla **P** também aciona o botão (atalho Wokwi).

## Tópico MQTT (telemetria)

Publicação JSON de exemplo:

```json
{"temp_c":23.50,"hum_pct":58.0,"bpm":78,"ts_ms":12345}
```

## Ajuste fino do hardware virtual

Se o **DHT22** ou o **botão** não responderem, abra o diagrama no Wokwi e verifique os **GPIOs**: DHT em **4**, botão em **18** com `INPUT_PULLUP` no firmware.
