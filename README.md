# CardioIA — FIAP (turma 1TIAO)

Repositório do grupo para o projeto **CardioIA** no curso de **Inteligência Artificial**. Abaixo resumimos os **entregáveis** (artefatos) por fase: curadoria de dados (Fase 1), notebooks de NLP e classificação (Fase 2) e protótipo IoT com MQTT e Node-RED (Fase 3).

**Fase 1 —** disciplina *Do Python à Fronteira Quântica*; capítulo *Robôs, Neurônios e Saúde: Uma Integração Inovadora pela IA*; integrador **Desafio Integrador: IA entre Robôs, Sinapses e Medicina**. Informações do curso: [FIAP ON](https://on.fiap.com.br).

## Integrantes

| Nome | RM | Função no grupo |
|------|-----|-----------------|
| Tiago Alves Cordeiro | 561791 | Responsável pelo repositório |
| Matheus Parra | 561907 | Integrante |
| Otavio Custodio de Oliveira | 565606 | Integrante |
| Thiago Henrique Pereira de Almeida Santos | 563327 | Integrante |
| Leandro Arthur Marinho Ferreira | 565240 | Integrante |

## O que foi entregue em cada fase

| Fase | O que está neste repo |
|------|------------------------|
| **1** | **Dados tabulares** (Heart Failure — `links.md` e notebook de EDA), **dados textuais** em `assets/` (dois arquivos com fonte citada), referência a **imagens** de raio-X (link público em `links.md`; arquivos grandes ficam fora do Git). README com origem das bases e limitações. |
| **2** | Parte com regras: `sintomas.txt`, `mapa_conhecimento.csv`, `fase2_parte1_diagnostico.ipynb`. Parte com ML: `dataset_risco.csv`, TF-IDF + modelos no `fase2_parte2_classificador.ipynb`. Detalhes em `notebooks/README_FASE2.md`. |
| **3** | Firmware e diagrama Wokwi (`wokwi/`), MQTT para `broker.hivemq.com`, fluxo em `docs/node-red/flows.json`, relatórios em `docs/`, evidências em `assets/evidencias/`. Detalhes técnicos em `docs/FASE3_IOT_FIAP.md`. Texto auxiliar para envio na plataforma em `docs/TEXTO_ENTREGA_MOODLE.txt`. |

Tudo aqui é **trabalho de disciplina** (protótipo e relatórios), não produto clínico nem sistema validado para paciente.

## Estrutura do repositório

```
cardio-ia-fase1/
├── README.md
├── links.md
├── wokwi/                   ← Fase 3: diagram.json, sketch.ino, libraries.txt
├── assets/
│   ├── texto_01_estatistica_cardiovascular_brasil_2023.txt
│   ├── texto_02_fatores_associados_doencas_cardiovasculares.txt
│   └── evidencias/          ← capturas (PNG) e diagrama da Fase 3
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
│       └── flows.json
└── firmware/
    └── README.md            ← indica o sketch em wokwi/
```

---

## Fase 1 — Dados para o CardioIA

### Parte 1 — Dados numéricos (planilha / CSV)

Nesta fase, **dados numéricos** referem-se à **base tabular** (registros agregados) usada em Python para exploração e modelagem, **independente** do protótipo com **ESP32** da Fase 3. O conjunto **Heart Failure Prediction** (Kaggle) foi utilizado na EDA. O CSV completo não está no repositório por tamanho; o link de download está em `links.md`. Coloque o arquivo em `../data/heart.csv` conforme o notebook de EDA.

| Campo | Valor |
|-------|--------|
| Nome | Heart Failure Prediction Dataset |
| Autor | Federico Soriano (fedesoriano) |
| Fonte | [Kaggle](https://www.kaggle.com/datasets/fedesoriano/heart-failure-prediction) |
| Registros / colunas | 918 linhas; 12 colunas (11 atributos + alvo `HeartDisease`) |

Conjunto internacional; serve para exercício de modelo, mas **não** representa o Brasil.

| Variável | Tipo | Comentário breve |
|----------|------|------------------|
| Age, RestingBP, Cholesterol, MaxHR, Oldpeak | Numéricos | Idade, PA, colesterol, FC máx., depressão ST |
| Sex, ChestPainType, RestingECG, ExerciseAngina, ST_Slope | Categóricos | Sexo, dor torácica, ECG, angina no teste, inclinação ST |
| FastingBS | Binário | Glicemia de jejum alterada |
| HeartDisease | Binário | **Alvo** — presença de doença cardíaca no registro |

### Parte 2 — Textos

| Arquivo | Conteúdo | Fonte |
|---------|-----------|--------|
| `assets/texto_01_estatistica_cardiovascular_brasil_2023.txt` | Números sobre DCV no Brasil | [SciELO / ABC](https://www.scielo.br/j/abc/a/jzFMcdN5y3w6CtjVgdJdSdR/?lang=pt) |
| `assets/texto_02_fatores_associados_doencas_cardiovasculares.txt` | Fatores de risco em texto | [SciELO / preprint](https://preprints.scielo.org/index.php/scielo/preprint/download/2927/5176/5408) |

Textos em português para trabalhar vetorização e NLP em PT-BR.

### Parte 3 — Imagens

| Campo | Valor |
|-------|--------|
| Nome | Cardiomegaly Chest X-Ray Image Dataset |
| Fonte | [Zenodo / NIH](https://zenodo.org/records/17937122) |
| Uso no projeto | Subconjunto (100+ imagens) com link no `links.md`; pastas de imagem não são versionadas no Git |

Uso estritamente acadêmico: pipeline e limitações do modelo, sem aplicação clínica real.

---

## Fase 2 — NLP e classificação

**Trabalho desenvolvido:** *Desafio Integrador: IA entre Robôs, Sinapses e Medicina*. Conteúdo de apoio no material do curso: Cap **10** (NLP por regras) e Cap **11** (NLP clássico / vetores).

### Parte 1 — Sintomas e mapa (regras)

10 frases em `notebooks/sintomas.txt`, 20 linhas no `notebooks/mapa_conhecimento.csv` e o notebook `fase2_parte1_diagnostico.ipynb`, que cruza texto com o mapa e **sugere** diagnóstico — demonstração didática, sem valor clínico.

### Parte 2 — TF-IDF e risco

30 frases rotuladas em `notebooks/dataset_risco.csv`; no `fase2_parte2_classificador.ipynb`: TF-IDF, split treino/teste, árvore de decisão e regressão logística. Dataset pequeno de propósito para enxergar métricas.

### Critérios de avaliação (referência de pontuação)

| Critério | Pontos |
|----------|--------|
| Relatos e mapa de conhecimento organizados | 2 |
| Código de extração de informações funcional | 2 |
| Dataset simples criado corretamente | 1 |
| Classificador treinado e testado corretamente | 2 |
| Documentação clara e repositório público com README completo | 1 |

---

## Fase 3 — IoT (*CardioIA Conectada*)

**Conteúdo:** *CardioIA Conectada: IoT e Visualização de Dados para a Saúde Digital* — telemetria simulada, MQTT e dashboard.

ESP32 no Wokwi com **DHT22** (temperatura/umidade) e **botão** simulando variação de **BPM**. O código alterna cenário online/offline; offline grava leituras em **fila em RAM** e tenta enviar de novo quando há “conexão”. Publicação MQTT em `broker.hivemq.com`, tópico `cardioia/grupo54/telemetria`. **Node-RED** lê o tópico e monta dashboard (gráfico, gauge, alerta). Não usamos SPIFFS no simulador; o comportamento e a fila estão explicados nos relatórios.

**Arquivos principais:** `docs/FASE3_IOT_FIAP.md` · `docs/TEXTO_ENTREGA_MOODLE.txt` · `wokwi/` · `docs/relatorio_parte1_edge.md` · `docs/relatorio_parte2_mqtt_dashboard.md` · `docs/node-red/flows.json` · `docs/node-red/README.md` · `firmware/README.md` · `assets/evidencias/` · `links.md`

### Ir Além (Atividades Extras da Fase 3)
Além dos requisitos básicos de Edge e Fog Computing, adicionamos as atividades bônus:
- **Ir Além 1 (REST e RPA de E-mail):** Em `scripts/fase3_ir_alem1_rest_email.py` simulamos um microsserviço que ingere dados via POST e aplica regras clínicas para disparar alertas automáticos por e-mail. Relatório em `docs/relatorio_ir_alem1_rest_email.md`.
- **Ir Além 2 (IA e Redes Neuromórficas):** O notebook `notebooks/fase3_ir_alem2_ia_series_temporais.ipynb` traz a implementação inovadora de um classificador clássico vs modelo LIF em séries temporais cardíacas. Relatórios detalhados em `docs/Relatorio_Comparativo_CardioIA.pdf` e `docs/detalhes_modelos_ia_cardioia.md`.

**(Opcional/Ação Requerida):** Vídeo de apresentação do Ir Além 2 no YouTube: https://youtu.be/mKrq-MxRo0s

---

## Licenças, LGPD e vieses

Só usamos bases adequadas a **uso acadêmico**, sem identificar pessoa.

| Dado | Licença / uso |
|------|----------------|
| Heart Failure (Kaggle) | Termos do Kaggle / licença indicada na página do dataset |
| Textos SciELO | CC / acesso aberto — citar fonte |
| Raio-X (Zenodo/NIH) | Uso de pesquisa, não comercial |

Limitações comuns: amostra **não brasileira** no Kaggle; desbalanceamento por sexo; dados hospitalares não cobrem quem não procura atendimento; imagens dependem de aparelho e protocolo.

---

## Links externos dos dados

Lista centralizada (Drive, Kaggle, Zenodo, Wokwi, GitHub raw): [`links.md`](./links.md).

---

**Repositório:** https://github.com/tiagoalvescordeiro/cardio-ia-fase1 · **Turma:** 1TIAO · **FIAP** 2026
