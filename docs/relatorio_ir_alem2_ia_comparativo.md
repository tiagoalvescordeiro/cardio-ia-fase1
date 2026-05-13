# CardioIA - Fase 3: Ir Além 2
## IA em Séries Temporais: LIF vs. Regressão Logística

### 1. Objetivo
Aplicar técnicas de Inteligência Artificial para a análise de séries temporais de sinais vitais (como a frequência cardíaca - BPM). O foco deste módulo foi comparar a abordagem de um classificador clássico preditivo (Regressão Logística) contra uma rede neuromórfica baseada em hardware/pulsos de baixa potência (Modelo LIF - Leaky Integrate-and-Fire).

### 2. Implementação e Metodologia
No arquivo `notebooks/fase3_ir_alem2_ia_series_temporais.ipynb`, implementamos:
- **Geração de Dados:** Uma série temporal sintética de 1.000 amostras simulando a leitura contínua de um sensor cardíaco (BPM médio = 75), com introdução randômica de curtos surtos de taquicardia (>110 BPM) para servirem como as "anomalias" a serem detectadas.
- **Modelo Clássico (Regressão Logística):** Utilizou-se o `scikit-learn` para treinar um modelo sobre uma janela deslizante (tamanho 3) de leituras anteriores, objetivando classificar se o momento atual é ou não uma anomalia.
- **Modelo Neuromórfico (LIF):** Desenvolvemos uma função simplificada em Python puro que simula um neurônio artificial de pulso (Spiking Neuron). Ele recebe a "diferença" do BPM em relação à normalidade como estímulo, acumula carga (potencial de membrana) e vaza essa carga (leak) ao longo do tempo. Quando o acúmulo de batimentos cardíacos anormais ultrapassa um limiar (threshold), o neurônio "dispara" (spike), sinalizando o alerta clínico.

### 3. Comparativo de Desempenho

| Característica | Regressão Logística | Modelo LIF (Neuromórfico) |
| :--- | :--- | :--- |
| **Abordagem de Memória** | Requer "Feature Engineering" (janelas deslizantes) para lembrar de dados passados. | Possui memória intrínseca e contínua através do "Potencial de Membrana". |
| **Poder Computacional** | Exige treino pesado prévio, uso de matrizes de peso e multiplicações em ponto flutuante. | Levissímo. Apenas soma e decaimento exponencial, ideal para Edge AI (como no ESP32). |
| **Resiliência a Ruído** | Um único ruído forte na leitura do sensor (outlier) pode forçar a classificação para "Anomalia". | Robusto. Um único ruído alto se perde no decaimento (leak). O disparo só ocorre perante "acúmulo sustentado" de anomalia, simulando fadiga clínica. |

### 4. Conclusões
Enquanto a Regressão Logística é excelente e precisa para problemas estáticos de detecção em nuvem (Cloud Computing) após empacotar e analisar os dados já adquiridos, **o modelo LIF mostra-se infinitamente superior para a filosofia IoT na ponta (Edge Computing)**.
Implementar um neurônio LIF diretamente no microcontrolador (ESP32) para processar as séries temporais dos batimentos instantaneamente exigiria quase zero RAM e CPU, além de alertar a equipe médica não quando houver um sobressalto momentâneo, mas sim quando houver uma condição crítica e *persistente* na janela de tempo de medição.

*(Link do vídeo de demonstração: [INSERIR LINK DO VÍDEO DO YOUTUBE AQUI])*
