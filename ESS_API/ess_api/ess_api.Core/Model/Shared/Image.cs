using MongoDB.Bson.Serialization.Attributes;

namespace ess_api.Core.Model
{
    public class Image
    {
        public string PublicId { get; set; }
        public string SecureUrl { get; set; }
        public string Url { get; set; }
        public string OriginalFileName { get; set; }
    }
}
