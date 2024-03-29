void initSerial(){
  Serial.begin(115200);
}

void initWifi(){
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while(WiFi.status() != WL_CONNECTED){
    delay(WIFI_INTERVAL);
  }
}

void checkWifiStatus(){
  if(WiFi.status() != WL_CONNECTED){
    initWifi();
  }
}

void initEpochTime(){ 
  configTime(3600, 0, ntpServer);
}

unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    //Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}
