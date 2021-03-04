using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Cosmos.Table;
using FunctionApp1.Modals;
using System.Collections.Generic;
using System.Linq;

namespace FunctionApp1
{
    public static class GetDataFromTableStorage
    {
        [FunctionName("GetDataFromTableStorage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            [Table("TotalMessages")] CloudTable cloudTable, 
            ILogger log)
        {
            string limit = req.Query["limit"];
            string orderby = req.Query["orderby"];
            string type = req.Query["type"];
            IEnumerable<WebEntity> results = await cloudTable.ExecuteQuerySegmentedAsync(new TableQuery<WebEntity>(), null);
            results = results.OrderBy(ts => ts.Created);
            if (orderby == "desc")
                results = results.OrderByDescending(ts => ts.Created);
            switch (type)
            {
                case "dht":
                    results = results.Where(el => el.PartitionKey=="dht"); 
                    break;
                case "distance":
                    results = results.Where(el => el.PartitionKey == "distance");  
                    break;
                default:
                    break;
            }
                
            if (limit != null)
                results = results.Take(int.Parse(limit));

            return new OkObjectResult(results);
        }

    }
}
