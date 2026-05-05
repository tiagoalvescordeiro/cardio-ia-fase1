/**
 * CardioIA — Fase 3 (FIAP)
 * ESP32 + DHT22 (temperatura/umidade) + botão (simulação de BPM variável)
 * Resiliência offline em RAM + publicação MQTT quando "online"
 *
 * Broker público de demonstração (sem credencial): broker.hivemq.com
 * Tópicos base: cardioia/grupo54/
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// --- Wi-Fi (Wokwi: rede virtual com internet) ---
static const char *WIFI_SSID = "Wokwi-GUEST";
static const char *WIFI_PASS = "";
static const uint8_t WIFI_CHANNEL = 6;

// --- MQTT (broker público — não usar dados sensíveis) ---
static const char *MQTT_HOST = "broker.hivemq.com";
static const uint16_t MQTT_PORT = 1883;
static const char *MQTT_CLIENT_PREFIX = "cardioia_g54_";
static const char *TOPIC_TELEM = "cardioia/grupo54/telemetria";
static const char *TOPIC_STATUS = "cardioia/grupo54/status";

// --- Sensores ---
#define DHTPIN 4
#define DHTTYPE DHT22
#define BTN_PIN 18

DHT dht(DHTPIN, DHTTYPE);
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);

struct Sample {
  float tempC;
  float humPct;
  int bpm;
  unsigned long ms;
};

static const int MAX_QUEUE = 48;
static Sample queue[MAX_QUEUE];
static int qCount = 0;

// Simula conectividade (enunciado): alterna periodicamente para demonstrar fila offline
static bool g_wifiSimuladoConectado = true;
static unsigned long lastWifiToggleMs = 0;
static const unsigned long WIFI_TOGGLE_MS = 45000;

// BPM simulado: base + impulsos ao pressionar o botão (debounce simples)
static float g_bpm = 72.0f;
static unsigned long lastBtnMs = 0;

static String mqttClientId;

void enqueueSample(const Sample &s) {
  if (qCount >= MAX_QUEUE) {
    for (int i = 1; i < MAX_QUEUE; i++) queue[i - 1] = queue[i];
    qCount = MAX_QUEUE - 1;
  }
  queue[qCount++] = s;
  Serial.printf("[EDGE] Fila: enfileirado T=%.2f H=%.1f BPM=%d (tamanho=%d)\n", s.tempC, s.humPct, s.bpm, qCount);
}

bool mqttPublishTelemetry(float t, float h, int bpm) {
  char payload[192];
  snprintf(payload, sizeof(payload),
           "{\"temp_c\":%.2f,\"hum_pct\":%.1f,\"bpm\":%d,\"ts_ms\":%lu}",
           t, h, bpm, millis());
  Serial.print("[CLOUD] ");
  Serial.println(payload);
  return mqtt.publish(TOPIC_TELEM, payload, false);
}

void flushQueueIfOnline() {
  if (!g_wifiSimuladoConectado || WiFi.status() != WL_CONNECTED || !mqtt.connected()) return;

  int flushed = 0;
  while (qCount > 0 && mqtt.connected()) {
    Sample s = queue[0];
    for (int i = 1; i < qCount; i++) queue[i - 1] = queue[i];
    qCount--;

    mqttPublishTelemetry(s.tempC, s.humPct, s.bpm);
    mqtt.loop();
    flushed++;
  }
  if (flushed > 0) {
    Serial.printf("[CLOUD] Sincronizados %d pacotes da fila offline.\n", flushed);
    mqtt.publish(TOPIC_STATUS, "{\"edge\":\"sync_done\"}", false);
  }
}

void ensureWifi() {
  if (WiFi.status() == WL_CONNECTED) return;
  Serial.print("[WiFi] Conectando...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS, WIFI_CHANNEL);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 20000) {
    delay(100);
    Serial.print(".");
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("[WiFi] OK, IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("[WiFi] Falha — leituras seguirão apenas em modo edge (fila).");
  }
}

void ensureMqtt() {
  if (!g_wifiSimuladoConectado || WiFi.status() != WL_CONNECTED) return;
  if (mqtt.connected()) return;

  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  Serial.print("[MQTT] Conectando...");
  unsigned long start = millis();
  while (!mqtt.connected() && millis() - start < 15000) {
    if (mqtt.connect(mqttClientId.c_str())) {
      Serial.println(" OK");
      mqtt.publish(TOPIC_STATUS, "{\"edge\":\"online\"}", false);
      return;
    }
    Serial.print(".");
    delay(500);
    mqtt.setServer(MQTT_HOST, MQTT_PORT);
  }
  Serial.println(" falha (dados permanecem na fila).");
}

void setup() {
  Serial.begin(115200);
  delay(200);

  dht.begin();
  pinMode(BTN_PIN, INPUT_PULLUP);

  {
    uint64_t mac = ESP.getEfuseMac();
    char cid[40];
    snprintf(cid, sizeof(cid), "%s%04X%04X", MQTT_CLIENT_PREFIX, (unsigned)(mac >> 32), (unsigned)mac);
    mqttClientId = String(cid);
  }

  Serial.println();
  Serial.println("=== CardioIA Fase 3 — Edge + MQTT ===");
  Serial.println("Simulacao Wi-Fi booleana alterna ~45s para demonstrar resiliencia offline.");

  ensureWifi();
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
}

void loop() {
  unsigned long now = millis();

  // Alterna conectividade simulada (requisito do enunciado)
  if (now - lastWifiToggleMs > WIFI_TOGGLE_MS) {
    lastWifiToggleMs = now;
    g_wifiSimuladoConectado = !g_wifiSimuladoConectado;
    Serial.printf("[SIM] wifiSimuladoConectado = %s\n", g_wifiSimuladoConectado ? "true" : "false");
    if (!g_wifiSimuladoConectado) {
      if (mqtt.connected()) mqtt.disconnect();
    }
  }

  // Botão: aumenta BPM simulado (debounce ~250 ms)
  if (digitalRead(BTN_PIN) == LOW && now - lastBtnMs > 250) {
    lastBtnMs = now;
    g_bpm = min(185.0f, g_bpm + 12.0f);
  }
  // Decaimento lento para parecer variacao fisiologica leve
  g_bpm = max(48.0f, g_bpm - 0.08f);

  static unsigned long lastRead = 0;
  if (now - lastRead < 3000) {
    mqtt.loop();
    return;
  }
  lastRead = now;

  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (isnan(t) || isnan(h)) {
    Serial.println("[DHT] Leitura invalida — ignorando ciclo.");
    mqtt.loop();
    return;
  }

  Sample s{t, h, (int)(g_bpm + 0.5f), now};

  if (g_wifiSimuladoConectado) {
    ensureWifi();
    ensureMqtt();
    if (WiFi.status() == WL_CONNECTED && mqtt.connected()) {
      bool ok = mqttPublishTelemetry(s.tempC, s.humPct, s.bpm);
      mqtt.loop();
      if (ok) {
        Serial.printf("[CLOUD] Publicado T=%.2f H=%.1f BPM=%d\n", s.tempC, s.humPct, s.bpm);
        mqtt.publish(TOPIC_STATUS, "{\"edge\":\"live_publish\"}", false);
      } else {
        Serial.println("[CLOUD] Falha ao publicar — enfileirando.");
        enqueueSample(s);
      }
    } else {
      enqueueSample(s);
    }
  } else {
    enqueueSample(s);
  }

  flushQueueIfOnline();
  mqtt.loop();
}
