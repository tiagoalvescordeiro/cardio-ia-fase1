# Relatório — Parte 2: Nuvem (MQTT) e visualização (Node-RED)

**Projeto:** CardioIA — Fase 3 (FIAP) — IoT em saúde  
**Grupo:** 1TIAO  
**Integrantes:** Tiago Alves Cordeiro (RM 561791), Matheus Parra (RM 561907), Otavio Custodio de Oliveira (RM 565606), Thiago Henrique Pereira de Almeida Santos (RM 563327), Leandro Arthur Marinho Ferreira (RM 565240)

---

## 1. Introdução

Após consolidar o processamento em borda, o fluxo Fog/Cloud concentra-se em **transportar telemetria** até um broker **MQTT** acessível pela Internet e em **exibir** esses dados em um **dashboard Node-RED**, com elementos gráficos e **alertas automáticos** quando variáveis ultrapassam limiares definidos pelo grupo. Essa arquitetura é típica de MVPs de IoT em saúde: sensores baratos publicam tópicos leves; aplicações de visualização assinam esses tópicos e disparam ações (notificações, cores, textos de alerta).

## 2. Escolha do broker e tópicos

Para fins acadêmicos e de reprodutibilidade internacional, utilizamos o broker público de testes **`broker.hivemq.com`** na porta **1883**, sem credencial embutida no firmware — o que evita vazamento de segredos no GitHub. O cliente MQTT do ESP32 utiliza um **ID único** derivado do endereço MAC da placa simulada, reduzindo colisões de sessão.

O tópico principal de telemetria é:

`cardioia/grupo54/telemetria`

Cada mensagem é um **JSON** compacto com quatro campos:

| Campo | Significado |
|-------|-------------|
| `temp_c` | Temperatura ambiente aproximada lida no DHT22 (°C) |
| `hum_pct` | Umidade relativa (%) |
| `bpm` | Batimentos simulados (inteiro) |
| `ts_ms` | Carimbo de tempo em milissegundos (`millis()`) |

Esse formato único simplifica o pipeline no Node-RED: um único **mqtt in** alimenta um nó **function** que faz `JSON.parse` e distribui valores para widgets distintos.

## 3. Segurança e ética de uso do broker público

O broker de demonstração **não** deve transportar dados clínicos reais identificáveis. Limitamo-nos a **valores sintéticos/simulados** coerentes com o caso de uso acadêmico. Em produção, seriam exigidos **TLS (8883)**, **ACLs por tópico**, **rotação de credenciais** e **tenant** dedicado (ex.: HiveMQ Cloud com autenticação).

## 4. Node-RED — arquitetura do fluxo

O arquivo `docs/node-red/flows.json` contém:

1. **mqtt in** assinando `cardioia/grupo54/telemetria`.  
2. **function** `parse + alertas` que converte o JSON em quatro mensagens paralelas.  
3. **ui_chart** para **temperatura** (°C).  
4. **ui_chart** para **BPM** (unidade adimensional).  
5. **ui_gauge** para **umidade** (%).  
6. **ui_text** para **status/alerta**.

O pacote **node-red-dashboard** provê os nós `ui_*`. Após importar, o deploy publica a UI em `/ui` na instalação local padrão.

## 5. Regras de alerta

Conforme rubrica sugerida pelo enunciado (exemplos):

- **Taquicardia simulada:** `bpm > 120` → mensagem `ALERTA: BPM elevado`.  
- **Febre simulada:** `temp_c > 38.0` → mensagem `ALERTA: febre (temperatura)`.

A prioridade visual é simples: o último critério verdadeiro sobrescreve o texto curto na área de status — suficiente para demonstração; em produção usaríamos máquina de estados ou cores graduais.

## 6. Grafana (opcional)

Não foi obrigatório para a rubrica base. Caso o grupo deseje “ir além”, recomenda-se conectar o HiveMQ como **MQTT broker datasource** ou ingerir os mesmos JSON via **Telegraf** → **InfluxDB** → **Grafana Cloud**, documentando credenciais fora do repositório.

## 7. Testes integrados sugeridos

1. Rodar o **Wokwi** e observar publicações no **MQTT Explorer** (desktop) assinando `cardioia/grupo54/#`.  
2. Com Node-RED ativo, validar que os **gráficos** respondem em até alguns segundos e que os **alertas** disparam ao pressionar o botão repetidamente (subida de BPM) ou ao alterar a temperatura simulada do DHT no editor de atributos do Wokwi.

## 8. Conclusão da Parte 2

Demonstramos o encadeamento **device → MQTT → dashboard**, com separação de papéis e evidências versionadas (`flows.json`, README). O diagrama **`assets/evidencias/arquitetura_fase3.svg`** resume a arquitetura; **prints PNG** da interface podem ser acrescentados na mesma pasta se a rubrica da FIAP exigir capturas de tela.
