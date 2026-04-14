# CardioIA - Fase 2: Análise Exploratória de Dados (EDA)

**Data de início:** 14/04/2026  
**Status:** 🔄 Em andamento  
**Objetivo:** Realizar análise exploratória e pré-processamento dos dados cardiovasculares

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

## 📊 Métricas de Avaliação (Fase 3)

Apesar de ainda estarmos na Fase 2, já planejamos as métricas:

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
| EDA Parte 1 - Dados Numéricos | 🔄 Em andamento | 14/04/2026 |
| EDA Parte 2 - Dados Textuais | 🕐 Pendente | 15/04/2026 |
| EDA Parte 3 - Dados Visuais | 🕐 Pendente | 16/04/2026 |
| Relatório de Conclusão Fase 2 | 🕐 Pendente | 17/04/2026 |

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
