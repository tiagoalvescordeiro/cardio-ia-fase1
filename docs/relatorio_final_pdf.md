# Relatório Comparativo: Desempenho de IA em Séries Temporais (CardioIA)

**Projeto:** CardioIA - Monitoramento Contínuo IoT na Saúde (Fase 3)  
**Atividade:** Ir Além 2 – Inteligência Artificial em séries temporais de saúde  
**Alunos:** Tiago Alves Cordeiro, Matheus Parra, Otavio Custodio, Thiago Santos, Leandro Ferreira  
**Repositório:** [github.com/tiagoalvescordeiro/cardio-ia-fase1](https://github.com/tiagoalvescordeiro/cardio-ia-fase1)  
**Vídeo de Demonstração:** [youtu.be/mKrq-MxRo0s](https://youtu.be/mKrq-MxRo0s)  

---

## 1. Introdução e Objetivo

No contexto do monitoramento cardiológico em tempo real via Edge Computing (como no microcontrolador ESP32 adotado neste projeto), os sinais vitais como os batimentos por minuto (BPM) geram **séries temporais** ruidosas. O objetivo desta análise é aplicar técnicas de Inteligência Artificial para detectar anomalias nessas séries (como picos de taquicardia) e comparar duas metodologias:
1. **Regressão Logística:** Um classificador estatístico tradicional.
2. **Modelo LIF (Leaky Integrate-and-Fire):** Uma rede neuromórfica bio-inspirada que imita o comportamento de um neurônio pulsante.

## 2. Metodologia de Implementação

Para garantir um ambiente de teste isolado e comparável, geramos uma série temporal sintética no Python contendo 1.000 amostras. A linha base do BPM foi definida em 75, com ruído aleatório embutido para simular sensores reais (como os disponíveis no Wokwi/Node-RED). Foram injetados artificialmente "surtos" de taquicardia (BPM > 115) para atuar como as anomalias alvo da detecção. 

Ambos os modelos foram programados no ambiente Jupyter Notebook (`fase3_ir_alem2_ia_series_temporais.ipynb`), sem o uso de nuvem pesada, focando em avaliar a viabilidade de execução diretamente na borda (Edge).

## 3. Avaliação de Desempenho e Arquitetura

### 3.1 O Classificador Tradicional: Regressão Logística
A Regressão Logística, por natureza, não lida com dados temporais sequenciais de forma contínua. Para contornar isso, empregamos a técnica de *Feature Engineering* conhecida como **Janela Deslizante (Sliding Window)**. Forçamos o modelo a "lembrar" do passado ao empacotar os 3 batimentos cardíacos anteriores como variáveis de entrada para prever a anomalia atual.

**Desempenho Observado:**
*   **Acurácia:** Altíssima para detecção dos picos artificiais gerados no treino.
*   **Problema de Ruído:** O modelo mostrou-se frágil contra *outliers* biológicos. Um único pico irreal (erro do sensor) pode forçar a equação sigmoide a categorizar aquele instante como uma anomalia grave.
*   **Custo Computacional:** Embora leve para nuvem (Cloud), exigir que o microcontrolador mantenha um buffer de memória de janela e realize dezenas de multiplicações matriciais em ponto flutuante por segundo drena bateria rapidamente no cenário Edge.

### 3.2 O Modelo Neuromórfico: Leaky Integrate-and-Fire (LIF)
A rede LIF abandona as matrizes estatísticas em favor de uma equação dinâmica que simula o estresse de um coração.
No CardioIA, definimos o "Estímulo" como a diferença entre o BPM atual e a zona de repouso. Cada batimento alto adiciona carga a uma variável interna chamada **Potencial de Membrana**. Se esse potencial cruzar a barreira de 5.0 (*Threshold*), o neurônio "dispara" o alerta de emergência e esvazia a carga. Para não ficar em alerta eterno por causa de ruídos momentâneos, o neurônio possui uma taxa de "Vazamento" (*Leak/Decay* = 0.8) que limpa a carga ociosa.

**Desempenho Observado:**
*   **Resiliência Orgânica:** O LIF ignorou completamente picos isolados (falhas de sensor). O alerta só disparou quando o acúmulo da taquicardia se manteve por vários segundos sustentados.
*   **Zero Memória Explícita:** Não há janelas deslizantes. O LIF precisou armazenar apenas uma variável `float` (o potencial) na memória RAM, independentemente de estarmos analisando o segundo passado ou a última meia hora.

## 4. Comparativo de Vantagens e Limitações

| Critério de Análise | Regressão Logística (Janelas) | Neuromórfico (LIF Neuron) |
| :--- | :--- | :--- |
| **Poder de Processamento Requerido** | Moderado (Operações matriciais/sigmoides contínuas) | **Mínimo** (Apenas uma soma e uma multiplicação por leitura) |
| **Uso de Memória RAM (Edge)** | Alto (Necessita *buffers* para janelas de dados passados) | **Irrisório** (Armazena apenas o estado atual de estresse) |
| **Reação a Falsos Positivos (Ruídos)** | Alta sensibilidade. Um ruído atípico dispara anomalia. | **Alta resiliência**. Vazamento (*Leak*) filtra ruídos isolados naturalmente. |
| **Fase de Treinamento** | Obrigatória e supervisionada (dados rotulados). | Adaptativa. Ajuste manual de limiares (Threshold e Decay). |

## 5. Conclusão da Escolha Estratégica
Enquanto a Regressão Logística é uma ferramenta formidável para a construção de *Dashboards* e processamento "pós-morte" na nuvem (Cloud Computing) — ideal para a Parte 2 do projeto —, ela peca no monitoramento imediato do hardware vestível (IoT Wearable). 

A implementação do **modelo LIF provou ser a arquitetura ideal** para as ambições do CardioIA. Ele permite que o processamento preditivo ocorra localmente no ESP32 (Edge Computing), sem dependência de internet constante, utilizando quase nenhuma bateria e protegendo a equipe médica de alarmes falsos causados por erros de biotelemetria momentânea. Este modelo é o alicerce biológico perfeito para escalar a análise contínua do projeto no futuro.
