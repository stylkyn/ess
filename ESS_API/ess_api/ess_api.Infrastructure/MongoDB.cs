using ess_api.Core.Constant;
using ess_api.Core.Model;
using MongoDB.Driver;
using System;

namespace ess_api.DAL
{
    public class MongoDB
    {
        public static IMongoClient Client { get; set; }
        public static IMongoDatabase _db { get; set; }
        public static string MongoConnection = MongoDBConstants.Connection;
        public static string MongoDatabase = MongoDBConstants.DatabaseName;

        public static IMongoCollection<UserModel> Users { get; set; }
        public static IMongoCollection<CategoryModel> Categories { get; set; }
        public static IMongoCollection<ProductModel> Products { get; set; }
        public static IMongoCollection<TransportModel> Transports { get; set; }
        public static IMongoCollection<PaymentModel> Payments { get; set; }
        public static IMongoCollection<SettingModel> Settings { get; set; }

        public MongoDB()
        {
            try
            {
                Client = new MongoClient(MongoConnection);
                _db = Client.GetDatabase(MongoDatabase);

                Users = _db.GetCollection<UserModel>("users");
                Categories = _db.GetCollection<CategoryModel>("categories");
                Products = _db.GetCollection<ProductModel>("products");
                Transports = _db.GetCollection<TransportModel>("transports");
                Payments = _db.GetCollection<PaymentModel>("payments");
                Settings = _db.GetCollection<SettingModel>("settings");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
