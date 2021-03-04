using IoTHubTrigger = Microsoft.Azure.WebJobs.EventHubTriggerAttribute;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.EventHubs;
using System.Text;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FunctionApp1.Modals;
using System;

namespace FunctionApp1
{
    public static class SaveToTableStorage
    {
        private static HttpClient client = new HttpClient();

        [FunctionName("SaveToTableStorage")]
        [return: Table("TotalMessages")]
        public static WebEntity Run([IoTHubTrigger("messages/events", Connection = "IotHub", ConsumerGroup = "table")]EventData message, ILogger log)
        {
            log.LogInformation($"PAYLOAD IN: {Encoding.UTF8.GetString(message.Body.Array)}");
            var payload = JsonConvert.DeserializeObject<Messages>(Encoding.UTF8.GetString(message.Body.Array));
            var webObj = new WebEntity();
            webObj.PartitionKey = payload.type;
            webObj.RowKey = Guid.NewGuid().ToString();
            webObj.DeviceId = payload.deviceId;
            webObj.Created = payload.ts;
            if (payload.type == "distance")
            {
                webObj.Distance = payload.data;
                return webObj;
            }
            if (payload.type == "dht")
            {
                webObj.Temperature = payload.temperature;
                webObj.Humidity = payload.humidity;
                return webObj;
            }
            return null;
        }
    }
}