#define trigPin 12
#define echoPin 27

#define SONIC_INTERVAL 300
unsigned long PREV_SONIC_MILLIS = 0;
int prev_distance = 0;
int current_distance = 0;
int diatance_diff = 5;

#define WIFI_INTERVAL 5000
unsigned long currentMillis;
const char* ntpServer = "pool.ntp.org";
unsigned long epochTime; 

#define DEVICE_ID "esp1"
#define MESSAGE_LEN_MAX 256
#define SCHOOL "Nackademin IoT 20"
#define NAME "Julia Gu"

bool messagePending = false;
