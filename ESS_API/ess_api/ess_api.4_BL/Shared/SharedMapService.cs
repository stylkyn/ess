using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Payment.Responses;
using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Setting.Responses;
using ess_api._4_BL.Services.Stats.Responses;
using ess_api._4_BL.Services.Transport.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using Libraries.Authetification.Responses;
using System;
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

        public static ImageResponse MapImage(Image request)
        {
            if (request == null) return null;

            return new ImageResponse
            {
                OriginalFileName = request.OriginalFileName,
                PublicId = request.PublicId,
                SecureUrl = request.SecureUrl,
                Url = request.Url
            };
        }

        /**
         * Stats
         */
         public StatsResponse MapStats(StatsModel request)
        {
            if (request == null)
                return null;

            return new StatsResponse
            {
                Profits = request.Profits.Select(x => new StatsProfitResponse
                {
                    MonthName = x.MonthName,
                    MonthNumber = x.MonthNumber,
                    ProfitTotal = MapPrice(x.ProfitTotal),
                    SalesCount = x.SalesCount,
                    UsersCount = x.UsersCount,
                    YearNumber = x.YearNumber
                }).ToList()
            };
        }

        /**
         * Payment
         */
        public PaymentResponse MapPayment(PaymentModel request)
        {
            if (request == null)
                return null;

            return new PaymentResponse
            {
                Id = request.Id.ToString(),
                Name = request.Name,
                Description = request.Description,
                Type = request.Type,
                Image = MapImage(request.Image),
                IsActive = request.IsActive,
                TotalPrice = MapPrice(request.TotalPrice),
            };
        }

        /**
         * Transport
         */
        public TransportResponse MapTransport(TransportModel request)
        {
            if (request == null)
                return null;

            return new TransportResponse
            {
                Id = request.Id.ToString(),
                Name = request.Name,
                Description = request.Description,
                Type = request.Type,
                IsActive = request.IsActive,
                Image = MapImage(request.Image),
                TotalPrice = MapPrice(request.TotalPrice),
            };
        }
        /**
         * Order
         */

        public OrderResponse MapOrder(OrderModel request)
        {
            return new OrderResponse
            {
                CreatedDate = request.CreatedDate,
                LastModified = request.LastModified,
                Id = request.Id.ToString(),
                State = request.State,
                PaymentState = request.PaymentState,
                OrderNumber = request.OrderNumber,
                OrderNumberFormatted = request.OrderNumberFormatted,
                Customer = request.Customer != null ? new OrderCustomerResponse {
                    UserId = request.Customer.UserId,
                    Personal = MapUserPersonal(request.Customer?.Personal),
                    Company = MapUserCompany(request.Customer?.Company)
                } : null,
                CalculatedData = MapCalculatedOrder(request.CalculatedData)
            };
        }
        public CalculatedOrderResponse MapCalculatedOrder(CalculatedOrder request)
        {
            return new CalculatedOrderResponse
            {
                Transport = request.Transport != null ? new CalculatedOrderTransportResponse
                {
                    TransportId = request.Transport.TransportId,
                    SourceData = MapTransport(request.Transport.SourceData),
                } : null,
                Payment = request.Payment != null ? new CalculatedOrderPaymentResponse
                {
                    PaymentId = request.Payment.PaymentId,
                    SourceData = MapPayment(request.Payment.SourceData)
                } : null,
                Products = request.Products.Select(p => new CalculatedOrderProductResponse
                {
                    Count = p.Count,
                    Product = MapProduct(p.Product),
                    Service = p.Service != null ? new CalculatedOrderProductServiceResponse {
                        Date = p.Service.Date,
                        UserId = p.Service.UserId,
                        Done = p.Service.Done,
                    } : null,
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
                Type = request.Type,
                Name = request.Name,
                UrlName = request.UrlName,
                PreviewName = request.PreviewName,
                PreviewDescription = request.PreviewDescription,
                Image = MapImage(request.Image),
                Description = request.Description,
                CategoryId = request.CategoryId,
                Gallery = request.Gallery.Select(x => MapImage(x)).ToList(),
                IsActive = request.IsActive,
                Buy = request.Buy != null ? new ProductBuyResponse
                {
                    Price = MapPrice(request.Buy.Price)
                } : null,
                Service = new ProductServiceResponse
                {
                    Price = MapPrice(request.Service?.Price)
                },
                Deposit = request.Deposit != null ? new ProductDepositResponse
                {
                    DepositValue = MapPrice(request.Deposit.DepositValue),
                    Price = MapPrice(request.Deposit.Price)
                } : null,
                TotalPrice = MapPrice(request.GetTotalPrice()),
                Stock = request.Stock != null ? new ProductStockResponse
                {
                    Count = request.Stock.Count,
                    PreOrderDays = request.Stock.PreOrderDays
                } : null,
            };
        }

        public ProductDetailResponse MapProductDetail(ProductModel request, List<ProductAvailability> availabilities = null)
        {
            return new ProductDetailResponse
            {
                Id = request.Id.ToString(),
                Name = request.Name,
                UrlName = request.UrlName,
                Type = request.Type,
                PreviewName = request.PreviewName,
                PreviewDescription = request.PreviewDescription,
                Image = MapImage(request.Image),
                Description = request.Description,
                CategoryId = request.CategoryId,
                IsActive = request.IsActive,
                Gallery = request.Gallery.Select(i => MapImage(i)).ToList(),
                Service = request.Service != null ? new ProductDetailServiceResponse
                {
                    Price = MapPrice(request.Service.Price),
                    Availabilities = MapProductAvailablities(availabilities)
                } : null,
                Buy = request.Buy != null ? new ProductDetailBuyResponse
                {
                    Price = MapPrice(request.Buy.Price),
                } : null,
                Deposit = request.Deposit != null ? new ProductDetailDepositResponse
                {
                    DepositValue = MapPrice(request.Deposit.DepositValue),
                    Price = MapPrice(request.Deposit.Price),
                    Availabilities = MapProductAvailablities(availabilities)
                } : null,
                Stock = request.Stock != null ? new ProductDetailStockResponse
                {
                    Count = request.Stock.Count,
                    PreOrderDays = request.Stock.PreOrderDays,
                } : null,
            };
        }

        public List<ProductResponse> MapProducts(List<ProductModel> product)
        {
            return product.Select(x => MapProduct(x)).ToList();
        }

        public List<ProductAvailabilityResponse> MapProductAvailablities(List<ProductAvailability> availabilities)
        {
            if (availabilities == null)
                return new List<ProductAvailabilityResponse>();

            return availabilities.Select(x => new ProductAvailabilityResponse
            {
                Day = x.Day,
                FreeCapacity = x.FreeCapacity
            }).ToList();
        }

        /**
         * Category
         */

        public CategoryResponse MapCategory(CategoryModel category)
        {
            if (category == null)
                return null;
            return new CategoryResponse
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                ParentCategoryId = category?.ParentCategoryId,
                UrlName = category.UrlName,
                Image = MapImage(category.Image),
                IsActive = category.IsActive,
            };
        }

        public List<CategoryResponse> MapCategories(List<CategoryModel> categories)
        {
            return categories.Select(x => MapCategory(x)).ToList();
        }

        /**
         * User
         */

        public UserResponse MapUser(UserModel user, AuthentificationTokenResponse token = null, bool withIds = false)
        {
            if (user == null)
                return null;

            var result = new UserResponse
            {
                Email = user.Email,
                Token = token,
                Personal = MapUserPersonal(user?.Personal),
                Company = MapUserCompany(user?.Company),
                HasAdminAccess = user.HasAdminAccess,
                HasAgentAccess = user.HasAgentAccess
            };
            if (withIds)
                result.Id = user.Id.ToString();

            return result;
        }

        public List<UserResponse> MapUsers(List<UserModel> users, bool withIds = false)
        {
            return users.Select(x => MapUser(x, null, withIds)).ToList();
        }

        public UserOptionResponse MapUserOption(UserModel user)
        {
            return new UserOptionResponse
            {
                Id = user.Id.ToString(),
                Name = user.Company?.CompanyId != null
                    ? user.Company?.CompanyName
                    : $"{user.Personal?.Firstname} {user.Personal?.Lastname}",
                Email = user.Email
            };
        }

        private UserPersonalResponse MapUserPersonal(UserPersonal personal)
        {
            if (personal == null)
                return null;

            return new UserPersonalResponse
            {
                Firstname = personal?.Firstname,
                Lastname = personal?.Lastname,
                Address = new UserAddressResponse
                {
                    City = personal?.Address?.City,
                    Country = personal?.Address?.Country,
                    Street = personal?.Address?.Street,
                    PostalCode = personal?.Address?.PostalCode,
                    HouseNumber = personal?.Address?.HouseNumber,
                },
                Contact = new UserContactResponse
                {
                    Email = personal?.Contact?.Email,
                    Phone = personal?.Contact?.Phone,
                }
            };
        }
        private UserCompanyResponse MapUserCompany(UserCompany company)
        {
            if (company == null)
                return null;

            return new UserCompanyResponse
            {
                CompanyId = company?.CompanyId,
                CompanyName = company?.CompanyName,
                CompanyVat = company?.CompanyVat,
                Address = new UserAddressResponse
                {
                    City = company?.Address?.City,
                    Country = company?.Address?.Country,
                    Street = company?.Address?.Street,
                    PostalCode = company?.Address?.PostalCode,
                    HouseNumber = company?.Address?.HouseNumber,
                }
            };
        }

        /*
         * 
         * Settings
         * 
         * **/

        public SettingResponse MapSettings(SettingModel setting)
        {
            if (setting == null)
                return null;

            return new SettingResponse
            {
                MaxServicesInDay = setting.MaxServicesInDay,
                MaxAvailabilityDays = setting.MaxAvailabilityDays
            };
        }
    }
}
