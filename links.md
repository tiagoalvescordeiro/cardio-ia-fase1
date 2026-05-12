# Links públicos — CardioIA (FIAP)

Este arquivo concentra **URLs públicas** para correção e reprodução: dados da **Fase 1** (tabular, textual, imagens), além de **Wokwi, MQTT e Node-RED** da **Fase 3**. Manter permissões de compartilhamento como *qualquer pessoa com o link*, quando aplicável.

---

## Fase 1 — Parte 1 — Dados numéricos

| Descrição | Link |
|---|---|
| Heart Failure Prediction Dataset (Kaggle — fonte original) | https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction |
| heart.csv — arquivo completo (918 linhas, 12 colunas) | https://drive.google.com/file/d/16gj5NjprTpV9a2PC1y7pvYApqnnqrL1a/view?usp=drive_link |

---

## Fase 1 — Parte 2 — Dados textuais

| Arquivo | Fonte original | Cópia no repositório |
|---|---|---|
| texto_01_estatistica_cardiovascular_brasil_2023.txt | https://www.scielo.br/j/abc/a/jzFMcdN5y3w6CtjVgdJdSdR/?lang=pt | [assets/texto_01](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/assets/texto_01_estatistica_cardiovascular_brasil_2023.txt) |
| texto_02_fatores_associados_doencas_cardiovasculares.txt | https://preprints.scielo.org/index.php/scielo/preprint/download/2927/5176/5408 | [assets/texto_02](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/assets/texto_02_fatores_associados_doencas_cardiovasculares.txt) |

Os arquivos `.txt` estão versionados em `assets/`, conforme o enunciado da Fase 1.

---

## Fase 1 — Parte 3 — Dados visuais (imagens)

| Descrição | Link |
|---|---|
| Cardiomegaly Chest X-Ray Dataset (Zenodo — fonte original) | https://zenodo.org/records/17937122 |
| Pasta com 100+ imagens selecionadas (.jpg) — subpasta train | https://drive.google.com/drive/folders/1AI2IvKojPOuHu_9s4A9gAJN7EQXR4hmm?usp=drive_link |

---

## Fase 3 — IoT (Wokwi, MQTT, Node-RED)

| Descrição | Link / recurso |
|---|---|
| Código-fonte Wokwi (`diagram.json`, `sketch.ino`, `libraries.txt`) | [pasta `wokwi` no GitHub](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/tree/main/wokwi) |
| Instruções de reprodução no Wokwi | [wokwi/README.md](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/wokwi/README.md) — projeto novo ESP32 Arduino em [wokwi.com/projects/new/esp32](https://wokwi.com/projects/new/esp32); colar `diagram.json` e `sketch.ino` a partir dos *raw* abaixo |
| **diagram.json** (raw) | https://raw.githubusercontent.com/tiagoalvescordeiro/cardio-ia-fase1/main/wokwi/diagram.json |
| **sketch.ino** (raw) | https://raw.githubusercontent.com/tiagoalvescordeiro/cardio-ia-fase1/main/wokwi/sketch.ino |
| **libraries.txt** (raw) | https://raw.githubusercontent.com/tiagoalvescordeiro/cardio-ia-fase1/main/wokwi/libraries.txt |
| Projeto Wokwi (Share) — entregável | **https://wokwi.com/projects/463138220013169665** — manter o conteúdo alinhado a [`wokwi/sketch.ino`](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/wokwi/sketch.ino) e [`wokwi/diagram.json`](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/wokwi/diagram.json); bibliotecas em [`libraries.txt`](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/wokwi/libraries.txt) |
| Broker MQTT (demonstração) | `broker.hivemq.com`, porta `1883` (público — não transportar dados sensíveis) |
| Tópico de telemetria | `cardioia/grupo54/telemetria` (JSON: `temp_c`, `hum_pct`, `bpm`, `ts_ms`) |
| Fluxo Node-RED (dashboard) | [flows.json](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/docs/node-red/flows.json) |
| Diagrama de arquitetura | [arquitetura_fase3.svg](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/assets/evidencias/arquitetura_fase3.svg) |

Arquivos Node-RED: `docs/node-red/`. Evidências em imagem: `assets/evidencias/` (ver README da pasta). Texto para entrega no Moodle: [`docs/TEXTO_ENTREGA_MOODLE.txt`](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/docs/TEXTO_ENTREGA_MOODLE.txt).

---

**Repositório:** https://github.com/tiagoalvescordeiro/cardio-ia-fase1  
**Turma:** 1TIAO — FIAP 2026  
**Integrantes:** Tiago Alves Cordeiro (RM 561791) | Matheus Parra (RM 561907) | Otavio Custodio de Oliveira (RM 565606) | Thiago Henrique Pereira de Almeida Santos (RM 563327) | Leandro Arthur Marinho Ferreira (RM 565240)
