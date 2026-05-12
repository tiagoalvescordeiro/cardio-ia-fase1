# Simulação Wokwi — CardioIA (Fase 3 / FIAP)

**Projeto público (Share):** https://wokwi.com/projects/463138220013169665  

**Importante:** o URL acima só está correto se o projeto **guardado na conta Wokwi** tiver o mesmo `sketch.ino` e `diagram.json` que estão no GitHub. Se no separador **Code** aparecer o sketch padrão (`Hello, ESP32!`), o projeto na nuvem **não foi atualizado** — copie o conteúdo dos links *raw* em [`../links.md`](../links.md), cole em **Code**, instale as bibliotecas e clique em **Save** (com login na Wokwi).

Recomenda-se manter o **sketch** e o **diagram.json** no Wokwi **idênticos** aos desta pasta no GitHub (copiar a partir do repositório ou dos links *raw* em [`../links.md`](../links.md)).

## Conteúdo da pasta

| Arquivo | Função |
|---------|--------|
| `diagram.json` | Hardware virtual: ESP32 DevKit v1, **DHT22** (temperatura e umidade) e **botão** (variação de BPM simulado). |
| `sketch.ino` | Firmware: leitura periódica, fila em RAM em modo *offline* simulado, **MQTT** para `broker.hivemq.com` quando *online*. |
| `libraries.txt` | Dependências Arduino no Wokwi. |

## Reprodução no Wokwi

1. Acessar [https://wokwi.com](https://wokwi.com) e criar **Novo projeto** → **ESP32** → **Arduino**.  
2. Substituir `diagram.json` e `sketch.ino` pelos desta pasta (ou pelo conteúdo dos *raw* em `links.md`).  
3. Instalar **PubSubClient**, **DHT sensor library** e **Adafruit Unified Sensor** (o Wokwi costuma resolver via `libraries.txt`).  
4. Executar (**Run**). O Monitor Serial deve exibir alternância de modo simulado e comportamento da fila; com Wi-Fi virtual `Wokwi-GUEST`, as publicações MQTT seguem para `cardioia/grupo54/telemetria`. Com o diagrama em foco, a tecla **P** aciona o botão (atalho Wokwi).

## Link público do projeto

É necessário um **URL público** do projeto Wokwi. Após validar a simulação:

1. Autenticar-se na Wokwi, se necessário.  
2. **Salvar** o projeto na nuvem.  
3. **Compartilhar** e copiar o URL `https://wokwi.com/projects/...`.  
4. Manter o URL em [`../links.md`](../links.md) e na entrega oficial da disciplina, junto com o link do **GitHub**.

A interface da Wokwi pode variar entre versões; o relevante é um link **público e estável** que abra o mesmo diagrama e *sketch*.

## Payload MQTT (telemetria)

```json
{"temp_c":23.50,"hum_pct":58.0,"bpm":78,"ts_ms":12345}
```

## GPIOs

**DHT22:** GPIO **4**. **Botão:** GPIO **18**, com `INPUT_PULLUP` no firmware.
