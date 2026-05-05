# CardioIA — Fase 1: Batimentos de Dados

**Curso:** Inteligência Artificial — FIAP  
**Fase:** 1 — Batimentos de Dados  
**Disciplina:** Do Python à Fronteira Quântica  
**Turma:** 1TIAO  
**Data de entrega:** 10/03/2026  

---

## 👥 Integrantes do Grupo

| Nome | RM | Papel |
|---|---|---|
| Tiago Alves Cordeiro | RM 561791 | Líder do Repositório |
| Matheus Parra | RM 561907 | Integrante |
| Otavio Custodio de Oliveira | RM 565606 | Integrante |
| Thiago Henrique Pereira de Almeida Santos | RM 563327 | Integrante |
| Leandro Arthur Marinho Ferreira | RM 565240 | Integrante |

---

## 📌 Sobre o Projeto

O **CardioIA** é um projeto acadêmico que simula o ecossistema de uma cardiologia moderna, integrando dados clínicos, Machine Learning, Visão Computacional, IoT e agentes inteligentes. Nesta **Fase 1**, atuamos como cientistas de dados hospitalares: o desafio foi levantar, organizar e compreender dados cardiológicos que futuramente alimentarão os módulos inteligentes do sistema.

Este repositório concentra **várias entregas FIAP** (Fases 1–3). A atividade **Fase 3 — IoT** (Wokwi, ESP32, MQTT, Node-RED) está descrita e checklistada em [`docs/FASE3_IOT_FIAP.md`](docs/FASE3_IOT_FIAP.md).

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

## 📊 Parte 1 — Dados numéricos (dataset clínico tabular)

_Não confundir com a **Fase 3 IoT** do enunciado FIAP (ESP32/Wokwi). Aqui trata-se de dados **estruturados em CSV** para análise e modelagem._

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

### Origem dos Dados

Dados **reais**, coletados em contextos hospitalares em diferentes países e unificados a partir de 5 bases cardiológicas internacionais: Cleveland, Hungarian, Switzerland, Long Beach VA e Stalog Heart Dataset.

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

### Aplicações em IA

- Modelos de classificação (Random Forest, XGBoost, Redes Neurais) para prever doença cardíaca
- Triagem automatizada em pronto-socorro com score de risco
- Detecção de anomalias em perfis atípicos de pacientes
- Explicabilidade clínica via SHAP values

---

## 📝 Parte 2 — Dados Textuais (NLP)

### Arquivos

| Arquivo | Tema | Fonte |
|---|---|---|
| `assets/texto_01_estatistica_cardiovascular_brasil_2023.txt` | Estatísticas nacionais de DCV 2023 | [SciELO / Arq. Bras. Cardiologia](https://www.scielo.br/j/abc/a/jzFMcdN5y3w6CtjVgdJdSdR/?lang=pt) |
| `assets/texto_02_fatores_associados_doencas_cardiovasculares.txt` | Fatores associados às DCV na população brasileira | [SciELO / Rev. Bras. Epidemiologia](https://preprints.scielo.org/index.php/scielo/preprint/download/2927/5176/5408) |

### Como Esses Textos Podem Ser Explorados por NLP

**1. Extração de entidades clínicas (NER)**  
Identificação automática de termos médicos como nomes de doenças, medicamentos, procedimentos e marcadores clínicos presentes nos textos.

**2. Classificação de tópicos (Topic Modeling)**  
Algoritmos como LDA identificam automaticamente temas presentes nos documentos — fatores de risco, prevalência, tratamento, prevenção — sem supervisão humana.

**3. Extração de sintomas e fatores de risco**  
Modelos especializados em saúde (BioBERT, BiomedBERT em português) extraem listas estruturadas de sintomas e comorbidades a partir de texto não estruturado.

**4. Sumarização automática**  
Modelos Seq2Seq (T5, BART) condensam artigos longos em resumos curtos, facilitando triagem bibliográfica e acesso rápido à informação clínica.

**5. Análise de sentimento e tom clínico**  
Identifica se trechos expressam certeza, dúvida, urgência ou negação — essencial para sistemas de apoio à decisão clínica.

### Relevância para IA em Saúde

A maior parte dos dados de saúde está em formato não estruturado (prontuários, relatórios, laudos). Dominar NLP aplicado à medicina é essencial para qualquer plataforma de IA cardiológica abrangente. Os textos escolhidos são de alta qualidade científica, em português e com dados brasileiros.

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

### Como Essas Imagens Serão Analisadas por Visão Computacional

**1. Detecção de padrões (Pattern Recognition)**  
Redes Neurais Convolucionais (CNNs) identificam padrões visuais como aumento da silhueta cardíaca, redistribuição vascular e derrame pleural.

**2. Segmentação de bordas**  
Algoritmos como U-Net segmentam as bordas do coração na radiografia, permitindo medição automatizada do índice cardiotorácico (ICT) — critério diagnóstico de cardiomegalia.

**3. Reconhecimento de anomalias**  
Modelos treinados com padrões normais identificam imagens que fogem do padrão, úteis para triagem e encaminhamento de casos urgentes.

**4. Classificação binária (normal vs. alterado)**  
Arquiteturas como ResNet, EfficientNet e VGG classificam radiografias como normais ou com sinais de cardiomegalia com acurácia comparável à de médicos residentes.

### Importância para IA na Saúde

A análise automatizada de imagens médicas é uma das áreas de maior impacto da IA na medicina. A detecção precoce de cardiomegalia em radiografias rotineiras pode antecipar diagnósticos de insuficiência cardíaca, doença de Chagas, valvopatias e miocardiopatias, salvando vidas com custo mínimo.

---

## 🔒 Governança de Dados e Ética

### Licenciamento

| Dado | Licença | Restrição |
|---|---|---|
| Heart Failure Dataset | Open Data (Kaggle CC) | Uso acadêmico e pesquisa |
| Artigos SciELO | Creative Commons (Acesso Aberto) | Citação obrigatória |
| Chest X-Ray NIH/Zenodo | Open Access (NIH) | Uso não comercial |

### Anonimização

Nenhum dado contém informações pessoais identificáveis (PII). Os dados são completamente anonimizados, em conformidade com a **LGPD** e diretrizes éticas para pesquisa em saúde.

### Vieses Identificados

**1. Viés de representatividade geográfica**  
O dataset numérico foi coletado majoritariamente em países europeus e norte-americanos. Características da população brasileira podem não estar representadas.

**2. Viés de sexo**  
Datasets cardiológicos historicamente super-representam pacientes do sexo masculino, o que pode gerar pior desempenho do modelo para mulheres.

**3. Viés de seleção hospitalar**  
Dados coletados em ambiente hospitalar excluem pacientes com doença assintomática ou sem acesso ao sistema de saúde.

**4. Qualidade variável das imagens**  
Radiografias de diferentes equipamentos apresentam variações de contraste e brilho que podem afetar a generalização dos modelos.

---

## 🔗 Links Públicos dos Dados

Consulte o arquivo [links.md](./links.md) para todos os links de acesso aos dados hospedados em serviços públicos de armazenamento.

---

## Fase 3 (FIAP) — Cap 1: CardioIA Conectada — IoT e visualização de dados

Conforme o enunciado da atividade (**monitoramento contínuo / IoT na saúde**), a entrega envolve **Wokwi (ESP32, DHT22 + segundo sensor)**, **resiliência offline**, **MQTT**, **dashboard Node-RED** (e Grafana opcional), além dos **relatórios** das partes 1 e 2.

- **Checklist (inclui itens Moodle):** [`docs/FASE3_IOT_FIAP.md`](docs/FASE3_IOT_FIAP.md)  
- **Texto para colar na entrega Moodle:** [`docs/TEXTO_ENTREGA_MOODLE.txt`](docs/TEXTO_ENTREGA_MOODLE.txt)  
- **Wokwi (diagrama + firmware comentado):** pasta [`wokwi/`](wokwi/) e guia [`wokwi/README.md`](wokwi/README.md)  
- **Relatório Parte 1 (Edge):** [`docs/relatorio_parte1_edge.md`](docs/relatorio_parte1_edge.md)  
- **Relatório Parte 2 (MQTT + dashboard):** [`docs/relatorio_parte2_mqtt_dashboard.md`](docs/relatorio_parte2_mqtt_dashboard.md)  
- **Node-RED (importar fluxo):** [`docs/node-red/flows.json`](docs/node-red/flows.json) + [`docs/node-red/README.md`](docs/node-red/README.md)  
- **Firmware (referência):** [`firmware/README.md`](firmware/README.md)  
- **Evidências (prints):** [`assets/evidencias/README.md`](assets/evidencias/README.md)  
- **Links consolidados:** [`links.md`](./links.md)

---

## 🚀 Próximas Fases

| Fase | Descrição | Status |
|---|---|---|
| Fase 1 | Curadoria e levantamento de dados | ✅ Concluída |
| Fase 2 | EDA, NLP e classificação (notebooks em `notebooks/`) | ✅ Entregue / evolução contínua |
| Fase 3 | Atividade FIAP — IoT, MQTT, Edge/Fog (Wokwi + Node-RED) | Concluída — ver `docs/FASE3_IOT_FIAP.md` e `wokwi/` |
| Fase 4 | Modelagem integrada (ML, NLP, Visão) e deploy | 🔜 Futura |

---

---

## Fase 2 - Cap 1: Diagnostico Automatizado - IA no Estetoscopio Digital

**Data de entrega:** 14/04/2026  
**Status:** Entregue

### Parte 1 - Extracao de Sintomas e Diagnostico

Implementacao de um sistema basico de apoio ao diagnostico cardiologico usando processamento de linguagem natural (NLP).

**Arquivos entregues:**

| Arquivo | Descricao |
|---|---|
| `notebooks/sintomas.txt` | 10 frases simulando descricoes de sintomas de pacientes |
| `notebooks/mapa_conhecimento.csv` | 20 associacoes entre sintomas e doencas cardiologicas |
| `notebooks/fase2_parte1_diagnostico.ipynb` | Codigo Python que le as frases, identifica sintomas e sugere diagnostico |

### Parte 2 - Classificador Basico de Texto (Triagem de Risco)

Classificador de risco cardiaco usando TF-IDF e Machine Learning para classificar frases como alto ou baixo risco.

**Arquivos entregues:**

| Arquivo | Descricao |
|---|---|
| `notebooks/dataset_risco.csv` | 30 frases rotuladas como alto risco ou baixo risco |
| `notebooks/fase2_parte2_classificador.ipynb` | Notebook com TF-IDF, Decision Tree, Logistic Regression e avaliacao |

### Criterios de Avaliacao

| Criterio | Pontos |
|---|---|
| Relatos e mapa de conhecimento organizados | 2 |
| Codigo de extracao de informacoes funcional | 2 |
| Dataset simples criado corretamente | 1 |
| Classificador treinado e testado corretamente | 2 |
| Documentacao clara e repositorio publico no GitHub com README completo | 1 |
| Video de demonstracao no YouTube (nao listado) com link incluido no GitHub | 2 |

---

*Repositório: https://github.com/tiagoalvescordeiro/cardio-ia-fase1*  
*Turma: 1TIAO — FIAP 2026*
