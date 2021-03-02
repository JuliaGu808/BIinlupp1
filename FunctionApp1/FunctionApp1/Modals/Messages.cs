using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionApp1.Modals
{
    public class Messages
    {
        public string deviceId { get; set; }
        public string name { get; set; }
        public string school { get; set; }
        public string type { get; set; }
        public long ts { get; set; }
        public float data { get; set; }       
        public float humidity { get; set; }
        public float temperature { get; set; }
        public int typeId { get; set; }
        public int messageId { get; set; }
        public DateTime utc { get; set; }
    }
}
