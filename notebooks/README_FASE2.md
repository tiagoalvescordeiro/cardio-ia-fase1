# CardioIA — Fase 2 (notebooks)

Complemento ao [`README.md`](../README.md) da raiz: aqui só o que roda nesta pasta e os ficheiros de dados que os notebooks usam.

## Atividade (FIAP ON)

**Desafio Integrador:** *IA entre Robôs, Sinapses e Medicina* — prazo **14/04/2026**.  
Matéria de apoio no portal: Cap **10** (NLP por regras) e Cap **11** (NLP clássico / vetores).

## Ficheiros e notebooks

| Ficheiro | Função |
|----------|--------|
| `sintomas.txt` | 10 frases de sintomas (entrada da Parte 1). |
| `mapa_conhecimento.csv` | 20 linhas sintoma → doença. |
| `dataset_risco.csv` | 30 frases com rótulo `alto risco` / `baixo risco` (Parte 2). |
| `fase2_parte1_diagnostico.ipynb` | Lê `sintomas.txt` e o mapa; cruza por regras e imprime sugestão (exercício, não diagnóstico real). |
| `fase2_parte2_classificador.ipynb` | TF-IDF, treino/teste, árvore de decisão e regressão logística sobre `dataset_risco.csv`. |
| `fase2_eda_parte1_dados_numericos.ipynb` | EDA opcional do Heart Failure; precisa de `../data/heart.csv` (instruções nas células; link do CSV no `links.md`). |

Correr os notebooks a partir desta pasta (`notebooks/`) para os caminhos relativos baterem certo.

## O que não entra nesta entrega

O EDA de números e o material de texto/imagem da **Fase 1** estão descritos no README da raiz. Não há obrigação de entregar LDA, nuvem de palavras ou notebook de imagem **aqui**; isso seria extra se alguém do grupo quisesse acrescentar depois.

## Métricas (Parte 2)

No classificador usamos acurácia, *classification report*, matriz de confusão e probabilidades nas frases de teste — o que o próprio notebook imprime.

## Grupo

Integrantes e link do repo: ver tabela no [`README.md`](../README.md).
