using IoTHubTrigger = Microsoft.Azure.WebJobs.EventHubTriggerAttribute;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.EventHubs;
using System.Text;
using System.Net.Http;
using Microsoft.Extensions.Logging;


namespace FunctionApp1
{
    public static class SaveToCosmos
    {
        private static HttpClient client = new HttpClient();

        [FunctionName("SaveToCosmos")]
        public static void Run(
            [IoTHubTrigger("messages/events", Connection = "IotHub")]EventData message,
            [CosmosDB(
                databaseName:"COSMOSdb1",
                collectionName:"ESP2dht",
                ConnectionStringSetting ="CosmosDb",
                CreateIfNotExists =true
            )] out dynamic cosmosdb,

            ILogger log
        )
        {
            log.LogInformation($"C# IoT Hub trigger function processed a message: {Encoding.UTF8.GetString(message.Body.Array)}");

            cosmosdb = Encoding.UTF8.GetString(message.Body.Array);
        }

    }
}