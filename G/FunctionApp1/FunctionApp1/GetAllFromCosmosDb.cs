using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;


namespace FunctionApp1
{
    public static class GetAllFromCosmosDb
    {
        [FunctionName("GetAllFromCosmosDb")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName:"COSMOSdb1",
                collectionName:"ESP2dht",
                ConnectionStringSetting ="CosmosDb",
                SqlQuery ="SELECT * FROM c ORDER BY c.ts DESC OFFSET 0 LIMIT 10"
            )]IEnumerable<dynamic> cosmos,
            ILogger log)
        {
            log.LogInformation("HTTP trigger function executed.");



            //string name = req.Query["name"];

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);
            //name = name ?? data?.name;

            //string responseMessage = string.IsNullOrEmpty(name)
            //    ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            //    : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(cosmos);

        }
    }
}
