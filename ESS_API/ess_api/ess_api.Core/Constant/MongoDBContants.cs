using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Constant
{
    public static class MongoDBConstants
    {
        public const string Connection = "mongodb://stylkyn:banicek21@ess-shard-00-00-dltnj.azure.mongodb.net:27017,ess-shard-00-01-dltnj.azure.mongodb.net:27017,ess-shard-00-02-dltnj.azure.mongodb.net:27017/test?ssl=true&replicaSet=ess-shard-0&authSource=admin&retryWrites=true&w=majority";
        public const string DatabaseName = "elitec_internal";
    }
}
