void initDHT() {
  pinMode(DHT_PIN, INPUT);
  dht.begin();
}

bool checkDiff() {
  if (abs(current_temperature - prev_temperature) > tmp_diff) return true;
  return false;
}

void sendDhtMessage() {

  current_temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  if ((currentMillis - PREV_DHT_MILLIS) >= DHT_INTERVAL 
        && !messagePending && checkDiff() 
        && !std::isnan(current_temperature) && !std::isnan(humidity)) 
  {
    Serial.println(current_temperature);
    Serial.println(prev_temperature);
    Serial.println(abs(current_temperature - prev_temperature));
    PREV_DHT_MILLIS = currentMillis;
    prev_temperature = current_temperature;
    messagePending = true;
    epochTime = getTime();
    char payload[MESSAGE_LEN_MAX];    
    DynamicJsonDocument doc(sizeof(payload));
    doc["deviceId"] = DEVICE_ID;
    doc["temperature"] = current_temperature;
    doc["humidity"] = humidity;
    doc["school"] = SCHOOL;
    doc["name"] = NAME;
    doc["ts"] = epochTime;
    serializeJson(doc, payload);

    sentAzureIothub(payload);
  }
}
