# CardioIA — repositório do grupo (FIAP)

Projeto acadêmico do curso de **Inteligência Artificial** (FIAP, **turma 1TIAO**). O repositório concentra entregas do **CardioIA**: aplicação de IA a um cenário cardiológico, evoluindo por fases conforme o programa do curso.

**Fase 1 (disciplina):** *Do Python à Fronteira Quântica* — Cap 1 no FIAP ON: **Robôs, Neurônios e Saúde: Uma Integração Inovadora pela IA** (atividade avaliada **Desafio Integrador: IA entre Robôs, Sinapses e Medicina**; prazos no [FIAP ON](https://on.fiap.com.br)).

---

## 👥 Integrantes

| Nome | RM | Papel |
|---|---|---|
| Tiago Alves Cordeiro | RM 561791 | Líder do Repositório |
| Matheus Parra | RM 561907 | Integrante |
| Otavio Custodio de Oliveira | RM 565606 | Integrante |
| Thiago Henrique Pereira de Almeida Santos | RM 563327 | Integrante |
| Leandro Arthur Marinho Ferreira | RM 565240 | Integrante |

---

## 📌 Sobre o repositório

No material do **FIAP ON**, o eixo do curso associa **IA**, **IoT** e desenvolvimento de sistemas ao projeto **CardioIA**, com ênfase em governança de dados e impacto social (objetivo explícito na **Fase 3**). Trata-se de **protótipos e entregas acadêmicas**, não de um produto clínico homologado.

Na **Fase 1**, o foco foi curadoria e documentação de dados **tabulares**, **textuais** e de **imagem**, com fontes públicas, notas de licença e discussão de vieses e LGPD.

Nas fases seguintes há notebooks de NLP e classificação; na **Fase 3**, integração **Wokwi + MQTT + Node-RED**. O roteiro detalhado da IoT está em [`docs/FASE3_IOT_FIAP.md`](docs/FASE3_IOT_FIAP.md).

---

## 📂 Estrutura do Repositório

```
cardio-ia-fase1/
├── README.md
├── links.md
├── wokwi/                   ← Fase 3: diagram.json + sketch.ino + libraries.txt (Wokwi)
├── assets/
│   ├── texto_01_estatistica_cardiovascular_brasil_2023.txt
│   ├── texto_02_fatores_associados_doencas_cardiovasculares.txt
│   └── evidencias/          ← PNG (Wokwi, GitHub flows) + arquitetura_fase3.svg (Fase 3)
├── notebooks/
│   ├── README_FASE2.md
│   ├── sintomas.txt
│   ├── mapa_conhecimento.csv
│   ├── dataset_risco.csv
│   ├── fase2_eda_parte1_dados_numericos.ipynb
│   ├── fase2_parte1_diagnostico.ipynb
│   └── fase2_parte2_classificador.ipynb
├── docs/
│   ├── TEXTO_ENTREGA_MOODLE.txt
│   ├── FASE3_IOT_FIAP.md
│   ├── relatorio_parte1_edge.md
│   ├── relatorio_parte2_mqtt_dashboard.md
│   └── node-red/
│       ├── README.md
│       └── flows.json       ← fluxo dashboard (importar no Node-RED)
└── firmware/
    └── README.md            ← aponta para wokwi/sketch.ino
```

---

## 📊 Parte 1 — Dados numéricos (tabela / CSV)

**Observação:** no enunciado da FIAP, a *Parte 1* aparece como «Dados numéricos (IoT)» no sentido de **base tabular** para o projeto CardioIA — **não** se refere ao protótipo ESP32/MQTT da **Fase 3**. O **Heart Failure Prediction** (abaixo) é o CSV usado para EDA/modelagem em Python; a telemetria da Fase 3 é outro fluxo.

### Dataset Utilizado

| Item | Detalhe |
|---|---|
| **Nome** | Heart Failure Prediction Dataset |
| **Autor** | Federico Soriano (fedesoriano) |
| **Fonte** | [Kaggle](https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction) |
| **Link público** | [Ver em links.md](./links.md) |
| **Formato** | `.csv` |
| **Registros** | 918 pacientes |
| **Variáveis** | 12 (11 features + 1 target) |

### Origem dos dados

Dataset público no **Kaggle**, agregando registros de bases internacionais (p.ex. Cleveland, Hungarian, Switzerland, Long Beach VA, Stalog). É adequado para exercícios de modelagem, mas **não** representa a população brasileira.

### Variáveis e Justificativa Clínica

| Variável | Tipo | Relevância Clínica |
|---|---|---|
| `Age` | Numérico | Risco cardiovascular cresce exponencialmente com a idade |
| `Sex` | Categórico | Homens têm maior incidência de DAC; mulheres apresentam sintomas atípicos |
| `ChestPainType` | Categórico | Sintoma cardinal de infarto; orienta triagem de risco |
| `RestingBP` | Numérico | Hipertensão é o principal fator de risco modificável para AVC e infarto |
| `Cholesterol` | Numérico | Níveis elevados de LDL causam aterosclerose |
| `FastingBS` | Binário | Diabetes multiplica em até 4x o risco de doença coronariana |
| `RestingECG` | Categórico | Identifica arritmias, hipertrofia e isquemia silenciosa |
| `MaxHR` | Numérico | Indicador da reserva funcional cardíaca |
| `ExerciseAngina` | Binário | Altamente sugestivo de isquemia miocárdica |
| `Oldpeak` | Numérico | Marcador de isquemia durante o esforço físico |
| `ST_Slope` | Categórico | Inclinação descendente associada a coronariopatia grave |
| `HeartDisease` | Binário | **Variável alvo** — o que o modelo de IA deve prever |

### Uso em modelos de IA (acadêmico)

- Classificação supervisionada para prever `HeartDisease` (ex.: árvore de decisão, regressão logística, ensembles)
- Análise de importância de variáveis e explicabilidade (**SHAP** ou equivalentes)
- Montagem de um fluxo simples de **triagem** com escore — apenas como exercício; **não** constitui apoio diagnóstico real

---

## 📝 Parte 2 — Dados Textuais (NLP)

### Arquivos

| Arquivo | Tema | Fonte |
|---|---|---|
| `assets/texto_01_estatistica_cardiovascular_brasil_2023.txt` | Estatísticas nacionais de DCV 2023 | [SciELO / Arq. Bras. Cardiologia](https://www.scielo.br/j/abc/a/jzFMcdN5y3w6CtjVgdJdSdR/?lang=pt) |
| `assets/texto_02_fatores_associados_doencas_cardiovasculares.txt` | Fatores associados às DCV na população brasileira | [SciELO / Rev. Bras. Epidemiologia](https://preprints.scielo.org/index.php/scielo/preprint/download/2927/5176/5408) |

### Linhas de trabalho em NLP

Com base nos textos em português, são possíveis, entre outras:

- **NER** (entidades clínicas): desde regras e léxicos até modelos contextualizados (transformers), conforme o nível da disciplina
- **Modelagem de tópicos** (ex.: LDA) para agrupar trechos por tema
- **Sumarização** (modelos seq2seq) como extensão opcional
- **Análise de tom ou polaridade** em trechos selecionados (exercício introdutório)

### Escolha dos textos

Fontes em **português**, com **dados e discussão sobre o Brasil**, o que facilita EDA e vetorização em PT-BR e complementa o viés geográfico de datasets internacionais.

---

## 🖼️ Parte 3 — Dados Visuais (Visão Computacional)

### Dataset Utilizado

| Item | Detalhe |
|---|---|
| **Nome** | Cardiomegaly Chest X-Ray Image Dataset |
| **Fonte** | [Zenodo / NIH Clinical Centre](https://zenodo.org/records/17937122) |
| **Link público** | [Ver em links.md](./links.md) |
| **Formato** | `.jpg` / `.png` (128x128px, escala de cinza) |
| **Total de imagens** | 5.552 imagens (mínimo 100 utilizados na Fase 1) |
| **Classes** | Cardiomegalia presente / Cardiomegalia ausente |
| **Divisão** | 80% treino / 20% teste |

### Abordagens típicas em visão computacional

- **Classificação** com CNNs (presença ou ausência de sinais associados a cardiomegalia)
- **Segmentação** (ex.: U-Net) para contorno cardíaco e medidas como ICT, com maior custo de implementação
- **Detecção de anomalias** em cenários com poucos rótulos ou classes desbalanceadas

### Escopo acadêmico

Imagens médicas exigem controle rigoroso de domínio, protocolo de aquisição e validação clínica. Neste repositório, o foco é o **pipeline técnico** (dados → treino → validação → limitações), sem pretensão de uso assistencial em produção.

---

## 🔒 Ética, licenças e limitações dos dados

Utilizamos apenas fontes adequadas a **uso acadêmico** e sem identificação pessoal.

### Licenças (resumo)

| Dado | Licença | Observação |
|---|---|---|
| Heart Failure (Kaggle) | termos do Kaggle / CC conforme página do dataset | pesquisa e ensino |
| Textos SciELO | Creative Commons / acesso aberto | citar a fonte |
| Raio-X (Zenodo/NIH) | open access NIH | uso não comercial |

### LGPD e anonimização

Os conjuntos referenciados são **anonimizados** ou agregados, compatíveis com discussão de LGPD em ambiente de laboratório.

### Vieses relevantes

- **Geografia:** amostras internacionais não refletem a população brasileira
- **Sexo:** sub-representação feminina é comum e pode degradar desempenho por subgrupo
- **Seleção:** dados hospitalares não captam população assintomática ou sem acesso a serviços
- **Imagem:** variação de equipamento e protocolo afeta generalização do modelo

---

## 🔗 Links dos dados

URLs e arquivos grandes (Drive, Kaggle, etc.) estão listados em [links.md](./links.md).

---

## Fase 3 — IoT (*CardioIA Conectada: IoT e Visualização de Dados para a Saúde Digital*)

**Prazo (FIAP ON):** até **12/05/2026** — confirmar no calendário da disciplina.

**Protótipo (Wokwi):** ESP32, sensor **DHT22** (temperatura e umidade) e **botão** para simular variação de **BPM**. O firmware implementa alternância **online/offline**; em modo sem conectividade, as leituras entram em **fila circular em RAM** e, ao restabelecer conexão, são publicadas via **MQTT** (`broker.hivemq.com`). O **Node-RED** consome o tópico e exibe gráficos, gauge e alerta por limiar.

Em vez de **SPIFFS** no simulador, optou-se por fila volátil e registro no **Serial**, conforme documentado nos relatórios.

**Documentação e artefatos:**

- Checklist e mapeamento ao enunciado: [`docs/FASE3_IOT_FIAP.md`](docs/FASE3_IOT_FIAP.md)  
- Texto para colagem no Moodle: [`docs/TEXTO_ENTREGA_MOODLE.txt`](docs/TEXTO_ENTREGA_MOODLE.txt)  
- Firmware e diagrama: [`wokwi/`](wokwi/), [`wokwi/README.md`](wokwi/README.md)  
- Relatório edge: [`docs/relatorio_parte1_edge.md`](docs/relatorio_parte1_edge.md)  
- Relatório MQTT + dashboard: [`docs/relatorio_parte2_mqtt_dashboard.md`](docs/relatorio_parte2_mqtt_dashboard.md)  
- Fluxo Node-RED: [`docs/node-red/flows.json`](docs/node-red/flows.json), [`docs/node-red/README.md`](docs/node-red/README.md)  
- Ponte ao sketch: [`firmware/README.md`](firmware/README.md)  
- Evidências gráficas: [`assets/evidencias/README.md`](assets/evidencias/README.md)  
- Links consolidados: [`links.md`](./links.md)

---

## 🚀 Fases do curso (resumo)

| Fase | Entrega principal | Status |
|---|---|---|
| 1 | Dados tabulares, textuais e de imagem + documentação | Concluída |
| 2 | NLP e classificação (*Desafio Integrador…*; Caps **10** e **11** no FIAP ON) | Entregue (14/04/2026) |
| 3 | IoT: Wokwi, MQTT, Node-RED (*CardioIA Conectada*) | Código no repositório; **validar entrega no Moodle** (12/05/2026) |
| 4 | Integração ML + NLP + visão (planejamento futuro) | Não iniciada |

---

## Fase 2 — *Início da IA avançada* (FIAP ON)

**Atividade (Cap 1):** *Desafio Integrador: IA entre Robôs, Sinapses e Medicina* — prazo **14/04/2026**.  
**Conteúdos correlatos no portal:** *Cap 10 — IA que Entende: Processamento de Linguagem Natural Baseado em Regras*; *Cap 11 — NLP no Estilo Clássico: Estatística, Vetores e Emoções em Texto*.

### Parte 1 — sintomas e mapa de conhecimento (regras)

Dez descrições sintéticas em `sintomas.txt`, mapa com 20 associações em `mapa_conhecimento.csv` e notebook que cruza texto e regras para **sugestão** de diagnóstico — **exercício didático**, sem validade clínica.

| Arquivo | Descrição |
|---|---|
| `notebooks/sintomas.txt` | 10 descrições sintéticas de sintomas |
| `notebooks/mapa_conhecimento.csv` | 20 associações sintoma–doença |
| `notebooks/fase2_parte1_diagnostico.ipynb` | leitura das frases, correspondência com o mapa e saída sugerida |

### Parte 2 — TF-IDF e classificação de risco

Vetorização **TF-IDF**, divisão treino/teste e modelos **árvore de decisão** e **regressão logística** sobre 30 frases em `dataset_risco.csv`. O conjunto é reduzido **de propósito**, para priorizar interpretação de métricas em ambiente controlado.

| Arquivo | Descrição |
|---|---|
| `notebooks/dataset_risco.csv` | 30 frases rotuladas (`alto risco` / `baixo risco`) |
| `notebooks/fase2_parte2_classificador.ipynb` | treino, teste e relatório de desempenho |

### Critérios de avaliação (especificação da atividade)

| Critério | Pontos |
|---|---|
| Relatos e mapa de conhecimento organizados | 2 |
| Código de extração de informações funcional | 2 |
| Dataset simples criado corretamente | 1 |
| Classificador treinado e testado corretamente | 2 |
| Documentação clara e repositório público no GitHub com README completo | 1 |

---

**Repositório:** https://github.com/tiagoalvescordeiro/cardio-ia-fase1 · **Turma:** 1TIAO · **FIAP** 2026
