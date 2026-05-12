# CardioIA — projeto da turma (FIAP)

Somos alunos do curso de **Inteligência Artificial** da FIAP (**turma 1TIAO**). Esse repositório é onde a gente centraliza o **CardioIA**: um projeto de IA aplicada a contexto cardiológico, que vai ganhando módulos conforme as fases do curso.

**Fase 1 da graduação:** *Do Python à Fronteira Quântica* — no FIAP ON o Cap 1 chama **A Busca de Dados: Preparando o Terreno para a Inteligência Cardiológica** (entrega **10/03/2026** — [FIAP ON](https://on.fiap.com.br)).

---

## 👥 Quem somos

| Nome | RM | Papel |
|---|---|---|
| Tiago Alves Cordeiro | RM 561791 | Líder do Repositório |
| Matheus Parra | RM 561907 | Integrante |
| Otavio Custodio de Oliveira | RM 565606 | Integrante |
| Thiago Henrique Pereira de Almeida Santos | RM 563327 | Integrante |
| Leandro Arthur Marinho Ferreira | RM 565240 | Integrante |

---

## 📌 O que é esse repo

No portal, o professor descreve a ideia geral: juntar **IA**, **IoT** e desenvolvimento para pensar na **CardioIA** como um ecossistema (inclusive com foco em governança de dados e impacto social — isso aparece forte na **Fase 3**). Aqui a gente não está entregando um produto hospitalar; é **trabalho de curso**, mas a gente tenta manter organizado como se fosse um projeto real.

Na **Fase 1** a gente focou no básico de cientista de dados: **dados tabulares**, **texto** e **imagem**, escolhendo fontes públicas e comentando limitações (viés, licença, LGPD).

Nas fases seguintes entram os notebooks de NLP/classificação, e na **Fase 3** um protótipo com **Wokwi + MQTT + Node-RED**. O passo a passo da parte de IoT está em [`docs/FASE3_IOT_FIAP.md`](docs/FASE3_IOT_FIAP.md) — é o “guia” que a gente mesmo usa pra não esquecer nada na entrega.

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

**Importante:** isso aqui é o dataset **Heart Failure** pra EDA e modelagem no Python — **não** é o mesmo dado do simulador com ESP32 da Fase 3 (lá é outro fluxo, mais “IoT”).

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

É um CSV “clássico” de Kaggle: junta bases de heart disease de vários centros (Cleveland, Hungarian, etc.). Serve bem pra aprender, mas **não** é amostra do Brasil.

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

### O que dá pra fazer com isso em IA (na prática de curso)

- Treinar classificadores (árvore, regressão logística, etc.) pra prever `HeartDisease`
- Brincar com **SHAP** / importância de features pra “explicar” o que o modelo olhou mais
- Simular uma **triagem** com score — sempre lembrando que é exercício, não decisão médica

---

## 📝 Parte 2 — Dados Textuais (NLP)

### Arquivos

| Arquivo | Tema | Fonte |
|---|---|---|
| `assets/texto_01_estatistica_cardiovascular_brasil_2023.txt` | Estatísticas nacionais de DCV 2023 | [SciELO / Arq. Bras. Cardiologia](https://www.scielo.br/j/abc/a/jzFMcdN5y3w6CtjVgdJdSdR/?lang=pt) |
| `assets/texto_02_fatores_associados_doencas_cardiovasculares.txt` | Fatores associados às DCV na população brasileira | [SciELO / Rev. Bras. Epidemiologia](https://preprints.scielo.org/index.php/scielo/preprint/download/2927/5176/5408) |

### E NLP, o que entra?

Com texto aberto dá pra treinar várias coisas que a gente vê na disciplina:

- **NER** (achar doença, medicamento, sintoma…) — hoje em dia muito com modelo transformer, mas dá pra começar com regras + dicionário
- **Tópicos** (tipo LDA) pra ver “de que assunto é esse parágrafo”
- **Sumarização** (T5/BART…) se alguém quiser ir além do escopo
- **Sentimento/tom** (útil mais em estudo de opinião do que em paper científico, mas é um exercício clássico)

### Por que a gente escolheu esses textos

São materiais **em português** e com **ângulo Brasil**, o que ajuda quando a gente treina vetorização ou faz análise exploratória — e foge um pouco do dataset “só gringo” que a gente vê em tudo quanto é lugar.

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

### Visão computacional — por onde começar

Em aula a gente costuma ouvir falar de:

- **CNN** pra classificar “tem sinal de cardiomegalia?” vs “não tem”
- **Segmentação** (tipo U-Net) se o trabalho for medir área / ICT — é mais trabalhoso, mas é o caminho “bonito”
- **Anomaly detection** se o dataset tiver muito desbalanceamento ou pouco label

### Expectativa realista

Pipeline de imagem médica é difícil: qualidade de exame varia, domínio muda de hospital pra hospital, e **nenhum modelo de turma substitui radiologista**. A ideia aqui é aprender o fluxo (dados → treino → validação → limitações).

---

## 🔒 Ética, licença e “pegadinhas” de dataset

A gente tentou usar só coisa com licença ok pra trabalho acadêmico e sem dado identificável.

### Licenças (resumo)

| Dado | Licença | Observação |
|---|---|---|
| Heart Failure (Kaggle) | aberto no Kaggle | uso acadêmico / estudo |
| Textos SciELO | CC / aberto | citar a fonte |
| Raio-X (Zenodo/NIH) | open access | não comercializar |

### LGPD / anonimização

Os conjuntos que a gente linkou são **anonimizados** ou agregados — não é prontuário real da família de ninguém.

### Vieses que aparecem em prova (e na vida)

- **Geografia:** o CSV de heart failure mistura bases de vários países — não é “Brasil puro”
- **Sexo:** muito dataset cardiológico tem mais homem na amostra → modelo pode errar mais em mulher
- **Seleção:** dado de hospital não representa quem nunca foi ao hospital
- **Imagem:** contraste/resolução diferentes atrapalham generalização

---

## 🔗 Onde baixar / ver os dados

Tudo que é link “pesado” (Drive, Kaggle, etc.) a gente centralizou em [links.md](./links.md) pra não ficar espalhado.

---

## Fase 3 — IoT (*CardioIA Conectada: IoT e Visualização de Dados para a Saúde Digital*)

**Prazo:** no nosso calendário aparece até **12/05/2026** — vale olhar de novo no **FIAP ON** pra não perder o horário.

Aqui a gente montou um **protótipo** no **Wokwi**: ESP32 + **DHT22** (temperatura/umidade) + **botão** que mexe num **BPM simulado** só pra fingir sinal vital. O enunciado pedia pensar em **queda de rede**: por isso o código finge “online/offline” e, quando cai, os pontos vão pra uma **fila em RAM**; quando volta, a gente tenta **drenar** e mandar pro **MQTT** (`broker.hivemq.com`). Na frente, um **Node-RED** com gráfico, gauge e um texto de alerta quando passa do limite.

SPIFFS no simulador é meio chato de justificar, então a gente ficou na fila em memória + log no Serial — o relatório explica isso melhor.

**Arquivos úteis:**

- Resumo e organização da entrega: [`docs/FASE3_IOT_FIAP.md`](docs/FASE3_IOT_FIAP.md)  
- Texto que a gente colou no Moodle (links prontos): [`docs/TEXTO_ENTREGA_MOODLE.txt`](docs/TEXTO_ENTREGA_MOODLE.txt)  
- Código do simulador: pasta [`wokwi/`](wokwi/) e dicas em [`wokwi/README.md`](wokwi/README.md)  
- Relatório da parte “edge”: [`docs/relatorio_parte1_edge.md`](docs/relatorio_parte1_edge.md)  
- Relatório da parte MQTT + dashboard: [`docs/relatorio_parte2_mqtt_dashboard.md`](docs/relatorio_parte2_mqtt_dashboard.md)  
- Fluxo do Node-RED (importar no editor): [`docs/node-red/flows.json`](docs/node-red/flows.json) e [`docs/node-red/README.md`](docs/node-red/README.md)  
- Ponte rápida para o sketch: [`firmware/README.md`](firmware/README.md)  
- Imagens e SVG que a gente anexou como evidência: [`assets/evidencias/README.md`](assets/evidencias/README.md)  
- Links todos juntos: [`links.md`](./links.md)

---

## 🚀 Como as fases fecham (visão rápida)

| Fase | O que a gente fez | Status |
|---|---|---|
| 1 | Dados (tabela, texto, imagem) + README | ✅ entregue |
| 2 | NLP “na mão” + classificador TF-IDF (*Desafio Integrador…* — Caps **10** e **11** no portal) | ✅ entregue (**14/04**) |
| 3 | Wokwi + MQTT + Node-RED (*CardioIA Conectada*) | código no ar; **falta conferir Moodle** (**12/05**) |
| 4 | Ideia: juntar ML + NLP + visão num pipeline mais “de produto” | 🔜 ainda não |

---

## Fase 2 — *Início da IA avançada* (FIAP ON)

**Atividade principal (Cap 1):** *Desafio Integrador: IA entre Robôs, Sinapses e Medicina* — prazo **14/04/2026**.  
**Aulas que mais conversam com o que a gente codou:** *Cap 10 — IA que Entende: Processamento de Linguagem Natural Baseado em Regras* e *Cap 11 — NLP no Estilo Clássico: Estatística, Vetores e Emoções em Texto*.

### Parte 1 — sintomas + mapinha de conhecimento (bem “regras + CSV”)

A gente inventou 10 descrições em `sintomas.txt`, montou um `mapa_conhecimento.csv` com 20 linhas e um notebook que “lê a frase e chuta” um diagnóstico **só pra aprender fluxo** — não é pra usar em paciente real.

| Arquivo | Descrição |
|---|---|
| `notebooks/sintomas.txt` | 10 frases fictícias de “paciente” |
| `notebooks/mapa_conhecimento.csv` | 20 regras sintoma → doença (didático) |
| `notebooks/fase2_parte1_diagnostico.ipynb` | código que cruza frase + mapa |

### Parte 2 — TF-IDF + modelo simples (triagem de texto)

Aqui a gente foi pro classique da disciplina: **TF-IDF**, split treino/teste, **árvore** e **regressão logística** em cima de 30 frases rotuladas (`dataset_risco.csv`). É pequeno de propósito — o ponto é ver vetor + métrica, não ganhar Kaggle.

| Arquivo | Descrição |
|---|---|
| `notebooks/dataset_risco.csv` | 30 frases (`alto risco` / `baixo risco`) |
| `notebooks/fase2_parte2_classificador.ipynb` | notebook com treino + avaliação |

### Rubrica (como o professor pontuou na especificação)

| Critério | Pontos |
|---|---|
| Relatos + mapa organizados | 2 |
| Extração funcionando | 2 |
| Dataset simples ok | 1 |
| Classificador treinado/testado | 2 |
| README/repo público redondos | 1 |
| Vídeo demo (YouTube não listado) linkado no GitHub | 2 |

---

Se caiu aqui de fora: **https://github.com/tiagoalvescordeiro/cardio-ia-fase1** — turma **1TIAO**, FIAP **2026**.
