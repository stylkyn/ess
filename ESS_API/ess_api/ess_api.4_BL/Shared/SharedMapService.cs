using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Payment.Responses;
using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Transport.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
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
                IsActive = request.IsActive,
                TotalPrice = MapPrice(request.TotalPrice),
                CashOnDelivery = request.CashOnDelivery != null ?
                    new CashOnDeliveryPaymentResponse { }
                : null,
                PaymentOrder = request.PaymentOrder != null ? 
                    new PaymentOrderResponse { }
                : null,
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
                TotalPrice = MapPrice(request.TotalPrice),
                PersonalPickup = request.PersonalPickup != null ? 
                    new PersonalPickupTransportResponse { }
                : null,
                CzechPost = request.CzechPost != null ? 
                    new CzechPostTransportResponse {
                        Places = request.CzechPost?.Places?.Select(x => new CzechPostTransportOptionResponse
                        {
                            Name = x.Name
                        }).ToList()
                    }
                : null,
                Zasilkovna = request.Zasilkovna != null ? 
                    new ZasilkovnaTransportResponse { }
                : null
            };
        }
        /**
         * Order
         */

        public OrderResponse MapOrder(OrderModel request)
        {
            return new OrderResponse
            {
                Id = request.Id.ToString(),
                State = request.State,
                OrderNumber = request.OrderNumber,
                Customer = request.Customer != null ? new OrderCustomerResponse {
                    UserId = request.Customer.UserId,
                    Personal = MapUserPersonal(request.Customer?.Personal),
                    Company = MapUserCompany(request.Customer?.Company)
                } : null,
                Transport = request.Transport != null ? new OrderTransportResponse {
                    TransportId = request.Transport.TransportId,
                    CzechPost = request.Transport.CzechPost != null ? new OrderCzechPostTransportResponse { } : null,
                    PersonalPickup = request.Transport.PersonalPickup != null ? new OrderPersonalPickupTransportResponse { } : null,
                    Zasilkovna = request.Transport.Zasilkovna != null ? new OrderZasilkovnaTransportResponse { } : null,
                    SourceData = MapTransport(request.Transport.SourceData)
                } : null,
                Payment = request.Payment != null ? new OrderPaymentResponse
                {
                    PaymentId = request.Payment.PaymentId,
                    State = request.Payment.State,
                    OrderCashOnDelivery = request.Payment.OrderCashOnDelivery != null ? new OrderCashOnDeliveryRespoonse { } : null,
                    PaymentOrder = request.Payment.PaymentOrder != null ? new OrderPaymentOrderResponse { } : null,
                    SourceData = MapPayment(request.Payment.SourceData)
                } : null,
                CalculatedData = MapCalculatedOrder(request.CalculatedData)
            };
        }
        public CalculatedOrderResponse MapCalculatedOrder(CalculatedOrder request)
        {
            return new CalculatedOrderResponse
            {
                Transport = request.Transport != null ? new  CalculatedOrderTransportResponse
                {
                    TransportId = request.Transport.TransportId,
                    Name = request.Transport.Name,
                    Type = request.Transport.Type,
                    TotalPrice = MapPrice(request.Transport.TotalPrice),
                } : null,
                Payment = request.Payment != null ? new CalculatedOrderPaymentResponse
                {
                    PaymentId = request.Payment.PaymentId,
                    Name = request.Payment.Name,
                    Type = request.Payment.Type,
                    TotalPrice = MapPrice(request.Payment.TotalPrice),
                } : null,
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
            if (user == null)
                return null;

            return new UserResponse
            {
                Email = user.Email,
                Token = token,
                Personal = MapUserPersonal(user?.Personal),
                Company = MapUserCompany(user?.Company)
            };
        }

        public List<UserResponse> MapUsers(List<UserModel> users)
        {
            return users.Select(x => MapUser(x)).ToList();
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
    }
}
