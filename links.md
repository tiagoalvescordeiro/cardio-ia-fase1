# Links Públicos dos Dados — CardioIA Fase 1

> **Importante:** Todos os links abaixo devem estar acessíveis publicamente para que o time da FIAP possa acessar durante a correção. Certifique-se de que as permissões de compartilhamento estão configuradas como "Qualquer pessoa com o link".

---

## Parte 1 — Dados Numéricos

| Descrição | Link |
|---|---|
| Heart Failure Prediction Dataset (Kaggle — fonte original) | https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction |
| heart.csv — arquivo completo (918 linhas, 12 colunas) | https://drive.google.com/file/d/16gj5NjprTpV9a2PC1y7pvYApqnnqrL1a/view?usp=drive_link |

---

## Parte 2 — Dados Textuais

| Arquivo | Fonte Original | Link no Repositório |
|---|---|---|
| texto_01_estatistica_cardiovascular_brasil_2023.txt | https://www.scielo.br/j/abc/a/jzFMcdN5y3w6CtjVgdJdSdR/?lang=pt | [assets/texto_01](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/assets/texto_01_estatistica_cardiovascular_brasil_2023.txt) |
| texto_02_fatores_associados_doencas_cardiovasculares.txt | https://preprints.scielo.org/index.php/scielo/preprint/download/2927/5176/5408 | [assets/texto_02](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/assets/texto_02_fatores_associados_doencas_cardiovasculares.txt) |

> Os arquivos .txt já estão disponíveis diretamente neste repositório público do GitHub na pasta `assets/`.

---

## Parte 3 — Dados Visuais (Imagens)

| Descrição | Link |
|---|---|
| Cardiomegaly Chest X-Ray Dataset (Zenodo — fonte original) | https://zenodo.org/records/17937122 |
| Pasta com 100+ imagens selecionadas (.jpg) — subpasta train | https://drive.google.com/drive/folders/1AI2IvKojPOuHu_9s4A9gAJN7EQXR4hmm?usp=drive_link |

---

## Notas

- Os dados textuais já estão integrados ao repositório GitHub e não requerem link externo adicional
- Os dados numéricos e visuais, por serem arquivos grandes, estão hospedados no Google Drive com acesso público
- Todos os links estão configurados como "Qualquer pessoa com o link" para acesso durante a correção

---

## Fase 3 — IoT (Wokwi, MQTT, Node-RED)

| Descrição | Link / recurso |
|---|---|
| **Código-fonte do projeto Wokwi** (`diagram.json`, `sketch.ino`, `libraries.txt`) | [pasta `wokwi` no GitHub](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/tree/main/wokwi) |
| **Instruções de reprodução no Wokwi (sem link Share)** | [wokwi/README.md](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/wokwi/README.md) — novo projeto ESP32 Arduino em [wokwi.com/projects/new/esp32](https://wokwi.com/projects/new/esp32), colar `diagram.json` e `sketch.ino` a partir dos **raw** abaixo |
| **diagram.json (raw)** | https://raw.githubusercontent.com/tiagoalvescordeiro/cardio-ia-fase1/main/wokwi/diagram.json |
| **sketch.ino (raw)** | https://raw.githubusercontent.com/tiagoalvescordeiro/cardio-ia-fase1/main/wokwi/sketch.ino |
| **libraries.txt (raw)** | https://raw.githubusercontent.com/tiagoalvescordeiro/cardio-ia-fase1/main/wokwi/libraries.txt |
| **Projeto numerado no Wokwi (Share)** — *entregável do enunciado* | Cole aqui `https://wokwi.com/projects/...` após salvar e compartilhar no Wokwi (ver [wokwi/README.md](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/wokwi/README.md#link-público-do-projeto-share--entrega-fiap)). Enquanto não houver URL, use os raw + GitHub na correção. |
| **Broker MQTT usado na demonstração** | `broker.hivemq.com` porta `1883` (público de teste — **não** usar dados sensíveis) |
| **Tópico de telemetria** | `cardioia/grupo54/telemetria` (payload JSON: `temp_c`, `hum_pct`, `bpm`, `ts_ms`) |
| **Fluxo Node-RED (dashboard)** | [flows.json no repositório](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/docs/node-red/flows.json) |
| **Diagrama de arquitetura (evidência)** | [arquitetura_fase3.svg](https://github.com/tiagoalvescordeiro/cardio-ia-fase1/blob/main/assets/evidencias/arquitetura_fase3.svg) |

Arquivos do **Node-RED**: `docs/node-red/`. **Prints** opcionais da simulação/UI: `assets/evidencias/` (ver README da pasta).

---

*Repositório: https://github.com/tiagoalvescordeiro/cardio-ia-fase1* 
*Grupo 1TIAO — FIAP 2026* 
*Integrantes: Tiago Alves Cordeiro (RM 561791) | Matheus Parra (RM 561907) | Otavio Custodio de Oliveira (RM 565606) | Thiago Henrique Pereira de Almeida Santos (RM 563327) | Leandro Arthur Marinho Ferreira (RM 565240)*
