using ess_api._4_BL.Services.Order.Model;
using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using System.Collections.Generic;
using System.Linq;

namespace ess_api._4_BL.Shared
{
    public class SharedMapService
    {
        /**
         * Shared Static
         */
        public static PriceResponse MapPrice(Price request)
        {
            if (request == null) return null;

            return new PriceResponse
            {
                CzkWithoutVat = request.CzkWithoutVat,
                CzkWithVat = request.CzkWithVat,
                VatPercentage = request.VatPercentage,
                VatType = request.VatType,
                PriceType = request.PriceType
            };
        }

        public CalculatedOrderResponse MapCalculatedOrder(CalculatedOrder request)
        {
            return new CalculatedOrderResponse
            {
                Products = request.Products.Select(p => new CalculatedOrderProductResponse
                {
                    Count = p.Count,
                    Product = MapProduct(p.Product),
                    TotalPrice = MapPrice(p.TotalPrice)
                }).ToList(),
                Total = new CalculatedOrderTotalResponse
                {
                    TotalPrice = MapPrice(request.Total.TotalPrice)
                }
            };
        }

        /**
         * Product
         */
        public ProductResponse MapProduct(ProductModel request)
        {
            return new ProductResponse
            {
                Id = request.Id.ToString(),
                Name = request.Name,
                UrlName = request.UrlName,
                PreviewName = request.PreviewName,
                PreviewDescription = request.PreviewDescription,
                PreviewImageUrl = request.PreviewImageUrl,
                Description = request.Description,
                CategoryId = request.CategoryId,
                Gallery = request.Gallery,
                Buy = request.Buy != null ? new ProductBuyResponse
                {
                    Price = SharedMapService.MapPrice(request.Buy.Price)
                } : null,
                Deposit = request.Deposit != null ? new ProductDepositResponse
                {
                    DepositValue = SharedMapService.MapPrice(request.Deposit.DepositValue),
                    Price = SharedMapService.MapPrice(request.Deposit.Price)
                } : null,
            };
        }

        public List<ProductResponse> MapProducts(List<ProductModel> product)
        {
            return product.Select(x => MapProduct(x)).ToList();
        }

        /**
         * Category
         */

        public CategoryResponse MapCategory(CategoryModel category)
        {
            return new CategoryResponse
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId,
            };
        }

        public List<CategoryResponse> MapCategories(List<CategoryModel> categories)
        {
            return categories.Select(x => MapCategory(x)).ToList();
        }

        /**
         * User
         */

        public UserResponse MapUser(UserModel user, AuthentificationTokenResponse token = null)
        {
            return new UserResponse
            {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Token = token
            };
        }

        public List<UserResponse> MapUsers(List<UserModel> users)
        {
            return users.Select(x => MapUser(x)).ToList();
        }
    }
}
