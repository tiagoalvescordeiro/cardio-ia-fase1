# CardioIA — Fase 2 (notebooks)

Complemento ao [`README.md`](../README.md) da raiz: aqui só o que roda nesta pasta e os arquivos de dados usados pelos notebooks.

## Fase 2 — conteúdo desta etapa

**Trabalho:** *Desafio Integrador: IA entre Robôs, Sinapses e Medicina*.  
Apoio teórico no material do curso: Cap **10** (NLP por regras) e Cap **11** (NLP clássico / vetores).

## Arquivos e notebooks

| Arquivo | Função |
|----------|--------|
| `sintomas.txt` | 10 frases de sintomas (entrada da Parte 1). |
| `mapa_conhecimento.csv` | 20 linhas sintoma → doença. |
| `dataset_risco.csv` | 30 frases com rótulo `alto risco` / `baixo risco` (Parte 2). |
| `fase2_parte1_diagnostico.ipynb` | Lê `sintomas.txt` e o mapa; cruza por regras e imprime sugestão (exercício, não diagnóstico real). |
| `fase2_parte2_classificador.ipynb` | TF-IDF, treino/teste, árvore de decisão e regressão logística sobre `dataset_risco.csv`. |
| `fase2_eda_parte1_dados_numericos.ipynb` | EDA opcional do Heart Failure; precisa de `../data/heart.csv` (instruções nas células; link do CSV no `links.md`). |

Execute os notebooks a partir desta pasta (`notebooks/`) para os caminhos relativos funcionarem.

## Escopo desta pasta

O EDA numérico e o material textual/imagem da **Fase 1** estão descritos no README da raiz. Esta pasta concentra só o bloco de NLP e classificação; extensões (LDA, nuvem de palavras, notebook de imagem) seriam trabalho adicional, fora do que aqui se apresenta.

## Métricas (Parte 2)

No classificador usamos acurácia, *classification report*, matriz de confusão e probabilidades nas frases de teste — o que o próprio notebook imprime.

## Grupo

Integrantes e link do repo: ver tabela no [`README.md`](../README.md).
