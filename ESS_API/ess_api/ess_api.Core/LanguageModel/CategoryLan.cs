namespace ess_api.Core.LanguageModel
{
    public class CategoryLan
    {
        public long Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public long? parent_category_Id { get; set; }
    }
}
