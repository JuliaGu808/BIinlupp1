#include "includes.h"
#include "config.h"
#include "securities.h"

void setup() {
  initSerial();
  initWifi(); 
  initSonic();
  initIotHub();
  initEpochTime();
}

void loop() {  
  currentMillis = millis();
  checkWifiStatus();
  sendSonic();
}
