using IoTHubTrigger = Microsoft.Azure.WebJobs.EventHubTriggerAttribute;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.EventHubs;
using System.Text;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Data.SqlClient;
using Newtonsoft.Json;
using FunctionApp1.Modals;

namespace FunctionApp1
{
    public static class SaveToSql
    {
        private static HttpClient client = new HttpClient();

        [FunctionName("SaveToSql")]
        public static void Run([IoTHubTrigger("messages/events", Connection = "IotHub", ConsumerGroup = "group1")]EventData message, ILogger log)
        {
            log.LogInformation($"C# IoT Hub trigger function processed a message: {Encoding.UTF8.GetString(message.Body.Array)}");

            var msg = JsonConvert.DeserializeObject<Messages>(Encoding.UTF8.GetString(message.Body.Array));

            var _connectionString = Environment.GetEnvironmentVariable("SqlConnection");

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                {
                    var _dhtTempSql = "IF NOT EXISTS (SELECT 1 FROM Devices WHERE DeviceId = @deviceId) " +
                                        "INSERT INTO Devices VALUES (@deviceId, @name, @school, @ts) " +
                        "IF NOT EXISTS (SELECT 1 FROM MessageTypes WHERE Type = @type) " +
                        "INSERT INTO MessageTypes VALUES (@type, @unit) " +
                        "DECLARE @msgid int " +
                        "DECLARE @msgtable table (id int) " +
                        "INSERT INTO Messages OUTPUT inserted.id into @msgtable VALUES (@deviceId, @ts) " +
                        "SELECT @msgid = id from @msgtable " +
                        "INSERT INTO MessageLines VALUES (@msgid, @utc, 'temperature' , @temperature) " +
                        "INSERT INTO MessageLines VALUES (@msgid, @utc, 'humidity', @humidity)";

                    var _distanceTempSql = "IF NOT EXISTS (SELECT 1 FROM Devices WHERE DeviceId = @deviceId) " +
                                        "INSERT INTO Devices VALUES (@deviceId, @name, @school, @ts) " +
                        "IF NOT EXISTS (SELECT 1 FROM MessageTypes WHERE Type = @type) " +
                        "INSERT INTO MessageTypes VALUES (@type, @unit) " +
                        "DECLARE @msgid int " +
                        "DECLARE @msgtable table (id int) " +
                        "INSERT INTO Messages OUTPUT inserted.id into @msgtable VALUES (@deviceId, @ts) " +
                        "SELECT @msgid = id from @msgtable " +
                        "INSERT INTO MessageLines VALUES (@msgid, @utc, 'distance' , @distance)";

                    conn.Open();

                    if (msg.type == "dht")
                    {
                        using (SqlCommand cmd = new SqlCommand(_dhtTempSql, conn))
                        {
                            DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(msg.ts);
                            msg.utc = dateTimeOffset.UtcDateTime;
                            cmd.Parameters.AddWithValue("@deviceId", msg.deviceId);
                            cmd.Parameters.AddWithValue("@name", msg.name);
                            cmd.Parameters.AddWithValue("@school", msg.school);
                            cmd.Parameters.AddWithValue("@ts", msg.ts);
                            cmd.Parameters.AddWithValue("@type", msg.type);
                            cmd.Parameters.AddWithValue("@unit", msg.type);
                            cmd.Parameters.AddWithValue("@temperature", msg.temperature);
                            cmd.Parameters.AddWithValue("@humidity", msg.humidity);
                            cmd.Parameters.AddWithValue("@utc", msg.utc);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    if (msg.type == "distance")
                    {
                        using (SqlCommand cmd = new SqlCommand(_distanceTempSql, conn))
                        {
                            DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(msg.ts);
                            msg.utc = dateTimeOffset.UtcDateTime;
                            cmd.Parameters.AddWithValue("@deviceId", msg.deviceId);
                            cmd.Parameters.AddWithValue("@name", msg.name);
                            cmd.Parameters.AddWithValue("@school", msg.school);
                            cmd.Parameters.AddWithValue("@ts", msg.ts);
                            cmd.Parameters.AddWithValue("@type", msg.type);
                            cmd.Parameters.AddWithValue("@unit", msg.type);
                            cmd.Parameters.AddWithValue("@distance", msg.data);
                            cmd.Parameters.AddWithValue("@utc", msg.utc);
                            cmd.ExecuteNonQuery();
                       }
                    }

                }


            }
        }
    }
}