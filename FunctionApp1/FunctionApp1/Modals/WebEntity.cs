using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionApp1.Modals
{
    public class WebEntity : TableEntity
    {
        public long Created { get; set; }
        public string DeviceId { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public double Distance { get; set; }
    }
}
