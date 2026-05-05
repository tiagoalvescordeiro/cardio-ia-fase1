# Relatório — Parte 1: Armazenamento e processamento local (Edge)

**Disciplina / projeto:** CardioIA — Fase 3 (FIAP)  
**Autores:** _(grupo)_  
**Data:** _(preencher)_

## 1. Objetivo

Descrever o fluxo do protótipo no **Wokwi** (ESP32) com **dois sensores** (obrigatório **DHT22** para temperatura e umidade + segundo sensor), simulação de **Wi‑Fi** e estratégia de **resiliência offline** (fila de leituras e envio quando “online”).

## 2. Arquitetura local

- **Sensores:** DHT22 em pino _(documentar)_; segundo sensor _(tipo e pino)_.  
- **Periodicidade de leitura:** _(ex.: a cada 2 s)_.  
- **Armazenamento:** _(SPIFFS em hardware real / fila em RAM ou log no Serial no Wokwi — documentar a escolha do grupo)_.  
- **Indicador de conectividade:** variável booleana `wifiConnected` (ou equivalente) e comportamento quando `false` vs `true`.

## 3. Lógica de resiliência

Explique em texto: o que acontece **sem rede** (acúmulo de leituras), o que acontece **ao reconectar** (envio em lote, limpeza da fila/arquivo), e como evita perda de dados dentro dos limites da memória.

## 4. Limitações do simulador

Registre limitações do **Wokwi** (ex.: SPIFFS) e como o grupo contornou usando **Monitor Serial** ou outra estratégia aceita pelo enunciado.

## 5. Link do projeto

**Wokwi:** _(colar URL pública do projeto compartilhado)_
