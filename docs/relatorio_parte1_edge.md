# Relatório — Parte 1: Armazenamento e processamento local (Edge)

**Projeto:** CardioIA — Fase 3 (FIAP) — IoT em saúde  
**Grupo:** 1TIAO  
**Integrantes:** Tiago Alves Cordeiro (RM 561791), Matheus Parra (RM 561907), Otavio Custodio de Oliveira (RM 565606), Thiago Henrique Pereira de Almeida Santos (RM 563327), Leandro Arthur Marinho Ferreira (RM 565240)

---

## 1. Introdução

Esta etapa reproduz o papel do **Edge Computing** em um cenário de monitoramento cardíaco simplificado: o microcontrolador **ESP32** lê sensores com periodicidade estável, trata leituras localmente e precisa manter **continuidade operacional** mesmo quando a conectividade de nuvem não está disponível. O enunciado da FIAP exige explicitamente **dois sensores distintos**, sendo um deles o **DHT22** (temperatura e umidade relativa) e um segundo elemento para compor o “painel” de sinais vitais simulados — adotamos um **botão** com debounce que incrementa um **BPM simulado**, com decaimento lento para imitar variação fisiológica. Esse desenho conecta-se ao objetivo macro do **FIAP ON** na Fase 3 (*Além das Fronteiras Digitais*): dados de sensores alimentando visualizações e decisões no ecossistema **CardioIA**, com foco em governança e impacto social no âmbito acadêmico (telemetria simulada, sem dados identificáveis de pacientes).

## 2. Montagem virtual (Wokwi)

O arquivo `diagram.json` descreve o hardware virtual: **ESP32 DevKit v1**, **DHT22** ligado ao **GPIO 4** e **botão** no **GPIO 18** com lógica `INPUT_PULLUP` no firmware. O Wokwi permite validar o comportamento sem componentes físicos, o que atende à restrição de custo do projeto acadêmico.

## 3. Fluxo de leitura e periodicidade

No `sketch.ino`, a leitura do DHT22 ocorre a cada **3 segundos**, intervalo superior ao mínimo recomendado pela biblioteca para evitar leituras instáveis. Quando a leitura é inválida (`NaN`), o ciclo é ignorado e o sistema não enfileira lixo — isso reduz ruído na fila e evita publicações MQTT inconsistentes.

## 4. Simulação de conectividade e resiliência

O enunciado pede uma **variável booleana** que simule estar “conectado” ou não à rede. Implementamos `g_wifiSimuladoConectado`, que **alterna aproximadamente a cada 45 segundos**. Quando falsa, o firmware **não tenta publicar na nuvem**; em vez disso, cada amostra válida é armazenada em uma **fila circular em RAM** (`queue[]`, capacidade 48 itens). Quando a variável volta a verdadeira, o laço principal restabelece **Wi-Fi** (`Wokwi-GUEST`, canal 6, conforme documentação Wokwi) e **MQTT** (`broker.hivemq.com`) e executa `flushQueueIfOnline`, drenando a fila com publicações JSON.

Essa política demonstra o princípio de **sincronização adiada**: dados produzidos no perímetro são preservados quando o canal WAN está indisponível e reenviados quando o canal retorna — analogia direta com dispositivos vestíveis em corredor hospitalar ou domiciliar com Wi-Fi intermitente.

## 5. SPIFFS e limitações do simulador

O roteiro da FIAP cita **SPIFFS** como armazenamento local opcional, mas alerta que o recurso não reflete fielmente no simulador. Por isso adotamos **persistência volátil em fila** + **trilhas no Monitor Serial** (`Serial.printf`), o que cumpre o espírito do requisito (“garantir resiliência offline”) sem depender de sistema de arquivos flash virtual.

## 6. Monitor Serial como evidência

Além do MQTT, cada publicação gera uma linha `[CLOUD] {...}` no serial — atendendo à sugestão do material de usar o monitor como prova textual do envio quando o ambiente não expõe SPIFFS.

## 7. Conclusão da Parte 1

O protótipo cumpre os pilares de **coleta**, **simulação de conectividade** e **resiliência** no edge, com sensores distintos e documentação no repositório (`wokwi/`). O ficheiro **`assets/evidencias/arquitetura_fase3.svg`** documenta visualmente a posição do edge no pipeline completo. A próxima etapa (Parte 2) detalha a integração **MQTT** e a visualização em **Node-RED**, usando o mesmo payload JSON para manter rastreabilidade ponta a ponta.
