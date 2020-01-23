﻿using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IProductRepository : IRepository<ProductModel>
    {
        Task<List<ProductModel>> Search(string categoryId);
    }
}