﻿using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Responses
{
    public class CategoryResponse : ResponseData
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("parentCategoryId")]
        public string ParentCategoryId { get; set; }

        [JsonProperty("subcategories")]
        public List<CategoryResponse> Subcategories { get; set; } = new List<CategoryResponse>();
    }
}
