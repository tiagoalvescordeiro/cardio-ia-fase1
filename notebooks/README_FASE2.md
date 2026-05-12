# CardioIA — Fase 2 (*Início da IA avançada* — FIAP ON)

**Atividade (Cap 1 no portal):** *Desafio Integrador: IA entre Robôs, Sinapses e Medicina* — prazo **14/04/2026**.  
**Aulas de apoio (NLP):** *Cap 10 — IA que Entende: Processamento de Linguagem Natural Baseado em Regras*; *Cap 11 — NLP no Estilo Clássico: Estatística, Vetores e Emoções em Texto*.

**Data de início (grupo):** 14/04/2026  
**Status:** Entregue (notebooks + CSVs em `notebooks/`)  
**Objetivo:** EDA dos dados tabulares; entregáveis do desafio integrador **CardioIA** — NLP por regras (`fase2_parte1_*`) e classificação textual com TF-IDF (`fase2_parte2_*`).

---

## 📊 Notebooks Planejados

### 1. `fase2_eda_parte1_dados_numericos.ipynb`
**Status:** ✅ Iniciado  
**Descrição:** Análise exploratória do dataset Heart Failure Prediction (918 registros)

**Conteúdo:**
- Carregamento e inspeção inicial dos dados
- Análise de valores ausentes e duplicados
- Estatísticas descritivas (média, mediana, desvio padrão)
- Detecção de outliers com boxplots
- Análise de correlações (heatmap)
- Visualizações de distribuições das variáveis
- Identificação de padrões clínicos relevantes

**Variáveis analisadas:**
- `Age`, `Sex`, `ChestPainType`
- `RestingBP`, `Cholesterol`, `FastingBS`
- `RestingECG`, `MaxHR`, `ExerciseAngina`
- `Oldpeak`, `ST_Slope`
- `HeartDisease` (variável alvo)

---

### 2. `fase2_eda_parte2_dados_textuais.ipynb`
**Status:** 🕐 Planejado  
**Descrição:** Análise de processamento de linguagem natural (NLP) dos textos científicos

**Conteúdo planejado:**
- Leitura dos arquivos TXT (assets/texto_01 e texto_02)
- Pré-processamento: tokenização, remoção de stopwords
- Extração de entidades médicas (NER - Named Entity Recognition)
- Análise de frequência de termos (TF-IDF)
- Nuvem de palavras com termos clínicos
- Identificação de fatores de risco mencionados
- Topic Modeling (LDA) para descobrir temas principais

**Bibliotecas:**
- `nltk`, `spacy`, `wordcloud`
- `sklearn.feature_extraction.text`
- `gensim` (para topic modeling)

---

### 3. `fase2_eda_parte3_dados_visuais.ipynb`
**Status:** 🕐 Planejado  
**Descrição:** Análise de imagens de raio-X torácico para detecção de cardiomegalia

**Conteúdo planejado:**
- Carregamento de imagens do Google Drive (100+ amostras)
- Inspeção das dimensões e formatos das imagens
- Análise da distribuição de classes (cardiomegalia presente/ausente)
- Visualização de amostras de cada classe
- Análise de histogramas de intensidade de pixels
- Verificação de desbalanceamento de classes
- Preparação para augmentation (rotação, zoom, flip)

**Bibliotecas:**
- `OpenCV`, `PIL`
- `matplotlib`, `seaborn`
- `tensorflow.keras.preprocessing`

---

## 🛠️ Pré-processamento Planejado

### Dados Numéricos:
1. **Tratamento de outliers:** Valores de Cholesterol = 0 (possíveis erros)
2. **Normalização:** StandardScaler ou MinMaxScaler
3. **Encoding:** One-Hot Encoding para variáveis categóricas
4. **Feature Engineering:** 
   - Criar faixas etárias
   - Combinar features relacionadas
   - Criar índices de risco

### Dados Textuais:
1. **Limpeza:** Remoção de caracteres especiais
2. **Normalização:** Lowercase, lematização
3. **Vetorização:** TF-IDF ou Word2Vec

### Dados Visuais:
1. **Redimensionamento:** Padronizar para 128x128 ou 224x224
2. **Normalização:** Pixels entre [0, 1]
3. **Augmentation:** Aumentar dataset com transformações
4. **Balanceamento:** Técnicas como SMOTE se necessário

---

## 📊 Métricas de Avaliação (modelagem nas fases seguintes)

Quando os modelos forem consolidados em produção acadêmica, recomenda-se reportar:

**Para classificação (Dados Numéricos e Visuais):**
- Acurácia
- Precisão, Recall, F1-Score
- Matriz de Confusão
- ROC-AUC

**Para NLP:**
- Coerência dos tópicos identificados
- Relevância dos termos extraídos

---

## 📅 Cronograma

| Atividade | Status | Prazo |
|-----------|--------|-------|
| EDA Parte 1 - Dados Numéricos | Concluído | 14/04/2026 |
| EDA Parte 2 - Dados Textuais | Planejado / opcional | — |
| EDA Parte 3 - Dados Visuais | Planejado / opcional | — |
| Atividades Cap 1 (NLP + classificador) | Entregue | 14/04/2026 |

---

## 👥 Equipe

- **Tiago Alves Cordeiro** (RM 561791) - Líder do Repositório
- **Matheus Parra** (RM 561907)
- **Otavio Custodio de Oliveira** (RM 565606)
- **Thiago Henrique Pereira de Almeida Santos** (RM 563327)
- **Leandro Arthur Marinho Ferreira** (RM 565240)

---

**Repositório:** [github.com/tiagoalvescordeiro/cardio-ia-fase1](https://github.com/tiagoalvescordeiro/cardio-ia-fase1)  
**FIAP 2026** - Inteligência Artificial - Turma 1TIAO
