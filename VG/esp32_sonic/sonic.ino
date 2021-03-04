void initSonic() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

bool checkDiff() {
  if (current_distance >= 100) return false;
  if (current_distance == 0) return false;
  if (abs(current_distance - prev_distance) > diatance_diff) return true;
  return false;
}

void sendSonic() {
  
  long duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration / 2) / 29.1;
  current_distance = map(distance, 0, 1000, 0, 1000);
  if ((currentMillis - PREV_SONIC_MILLIS) > SONIC_INTERVAL
      && !messagePending && checkDiff())
  {
    PREV_SONIC_MILLIS = currentMillis;
    prev_distance = current_distance;
    messagePending = true;
    epochTime = getTime();
    char payload[MESSAGE_LEN_MAX];
    DynamicJsonDocument doc(sizeof(payload));
    doc["deviceId"] = DEVICE_ID;
    doc["type"] = "distance";
    doc["data"] = current_distance;
    doc["school"] = SCHOOL;
    doc["name"] = NAME;
    doc["ts"] = epochTime;
    serializeJson(doc, payload);
Serial.println("send sonic 2");
    sentAzureIothub(payload);

  }
}
