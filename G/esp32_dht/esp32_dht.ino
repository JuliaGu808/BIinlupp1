#include "includes.h"
#include "config.h"
#include "securities.h"

void setup() {
  initSerial();
  initWifi(); 
  initDHT();
  initIotHub();
  initEpochTime();
}

void loop() {
  currentMillis = millis();
  checkWifiStatus();
  sendDhtMessage();
}
