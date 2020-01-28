using ess_api.Core.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.DAL
{
    public class MongoDB
    {
        public static IMongoClient Client { get; set; }
        public static IMongoDatabase _db { get; set; }
        public static string MongoConnection = "mongodb://stylkyn:banicek21@ess-shard-00-00-dltnj.azure.mongodb.net:27017,ess-shard-00-01-dltnj.azure.mongodb.net:27017,ess-shard-00-02-dltnj.azure.mongodb.net:27017/test?ssl=true&replicaSet=ess-shard-0&authSource=admin&retryWrites=true&w=majority";
        public static string MongoDatabase = "elitec_internal";

        public static IMongoCollection<UserModel> Users { get; set; }
        public static IMongoCollection<CategoryModel> Categories { get; set; }
        public static IMongoCollection<ProductModel> Products { get; set; }

        public MongoDB()
        {
            try
            {
                Client = new MongoClient(MongoConnection);
                _db = Client.GetDatabase(MongoDatabase);

                Users = _db.GetCollection<UserModel>("users");
                Categories = _db.GetCollection<CategoryModel>("categories");
                Products = _db.GetCollection<ProductModel>("products");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
