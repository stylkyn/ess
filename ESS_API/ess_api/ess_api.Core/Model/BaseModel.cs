using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class BaseModel
    {
        [BsonId]
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; private set; } = DateTime.Now;

        public DateTime LastModified { get; set; } = DateTime.Now;
    }
}
