# Detalhamento Técnico: Modelos de Inteligência Artificial (CardioIA)

Este documento fornece uma análise profunda das arquiteturas de IA exploradas no projeto CardioIA (Fase 3 - Ir Além 2), comparando a abordagem estatística clássica com a abordagem neuromórfica bio-inspirada para monitoramento de saúde em tempo real.

---

## 1. Contexto: Monitoramento de Séries Temporais Cardíacas

No monitoramento de pacientes cardiológicos, os sinais vitais como o BPM (Batimentos por Minuto) não são pontos isolados, mas sim **séries temporais**. Uma leitura de 120 BPM pode ser um ruído momentâneo do sensor, um esforço físico normal ou uma taquicardia clínica. A IA precisa ter "memória" para distinguir esses cenários, especialmente quando rodando em dispositivos de baixa potência na ponta (Edge Computing).

---

## 2. Modelo A: Regressão Logística (Abordagem Estatística Clássica)

A Regressão Logística é um modelo linear de classificação que utiliza a função sigmoide para mapear entradas em uma probabilidade entre 0 e 1.

### Funcionamento no CardioIA:
1. **Feature Engineering (Janela Deslizante):** Como a Regressão Logística "pura" não tem memória, precisamos transformar o tempo em colunas. Criamos uma janela onde a entrada para a predição no tempo $t$ é composta pelos valores de $[t, t-1, t-2]$.
2. **Treinamento:** O modelo aprende pesos ($w$) para cada posição da janela. Se o peso de $t$ e $t-1$ forem altos, o modelo entende que batimentos altos sustentados levam à classe "Anomalia".
3. **Equação:** $P(y=1) = \frac{1}{1 + e^{-(w_0 + w_1x_1 + w_2x_2 + w_3x_3)}}$

### Prós e Contras:
*   **Vantagem:** Muito precisa para dados tabulares e bem comportados; fácil de interpretar os coeficientes.
*   **Desvantagem:** Exige pré-processamento caro (manter janelas de dados em memória) e não lida bem nativamente com a natureza dinâmica e ruidosa de sensores biológicos sem aumentar muito a complexidade.

---

## 3. Modelo B: Leaky Integrate-and-Fire - LIF (Abordagem Neuromórfica)

O modelo LIF é uma das representações mais simples e eficazes de um **neurônio de pulso (Spiking Neuron)**. Ele simula o comportamento biofísico de uma membrana neuronal.

### Funcionamento no CardioIA:
O neurônio funciona como um "balde furado":
1. **Integração (Integrate):** Cada leitura de BPM acima de um valor basal (75 BPM) é vista como um "estímulo". Esse estímulo enche o balde (aumenta o **Potencial de Membrana**).
2. **Vazamento (Leaky):** O balde tem um furo constante. Se o estímulo parar, o nível de água (potencial) diminui gradualmente. Isso filtra ruídos isolados.
3. **Disparo (Fire):** Se o estímulo for forte e persistente o suficiente para o balde transbordar (**Limiar/Threshold**), o neurônio dispara um **Spike** (Alerta).

### Parâmetros Técnicos Implementados:
*   **V (Potential):** Estado interno do neurônio. No Dashboard, visível na barra de progresso.
*   **Decay (τ):** Fator de decaimento (ex: 0.8). Determina quão rápido a IA "esquece" um evento.
*   **Threshold (θ):** O valor crítico (ex: 5.0). Define a sensibilidade clínica do alerta.

### Por que é Inovador para Edge AI?
Ao contrário da Regressão Logística, o LIF:
*   **Não requer janelas de dados:** Ele só precisa guardar **um único número** (o potencial atual) para ter memória do passado.
*   **Custo Computacional Quase Zero:** Envolve apenas uma multiplicação e uma soma por ciclo. É perfeito para rodar dentro de um microcontrolador como o ESP32 ou em aceleradores de IA de baixíssima potência.

---

## 4. Comparativo de Arquitetura

| Métrica | Regressão Logística | Modelo LIF |
| :--- | :--- | :--- |
| **Matemática** | Probabilística / Gradiente | Dinâmica de Sistemas / Bio-inspirada |
| **Memória** | Explícita (Buffer de Janela) | Implícita (Estado Interno) |
| **Resiliência** | Sensível a Outliers | Robusta a Ruídos (Filtro Natural) |
| **Hardware Ideal** | Cloud / Gateway (Raspberry Pi) | Edge / Sensor (ESP32 / NPU) |

---

## 5. Demonstração em Vídeo
A aplicação prática desses modelos, mostrando a detecção em tempo real e o comportamento das curvas de aprendizado vs. acúmulo de potencial, pode ser visualizada no link abaixo:

👉 [Assista à demonstração técnica no YouTube](https://youtu.be/mKrq-MxRo0s)

---
**Documentação preparada para a disciplina de IoT e IA - FIAP 2026**
