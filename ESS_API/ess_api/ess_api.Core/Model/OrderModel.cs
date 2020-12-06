using ess_api.Core.Model.Shared;

namespace ess_api.Core.Model
{
    public class OrderModel : BaseModel
    {
        public OrderState State { get; set; } = OrderState.Created;
        public PaymentState PaymentState { get; set; } = PaymentState.NotPaid;

        public long OrderNumber { get; set; }
        public string OrderNumberFormatted { get; set; }
        public OrderCustomer Customer { get; set; }
        public CalculatedOrder CalculatedData { get; set; }

        public string GetOrderStateName()
        {
            switch (State)
            {
                case OrderState.Created:
                    return "Vytvořená";
                case OrderState.CalculateReady:
                    return "Uložen výpočet";
                case OrderState.TransportReady:
                    return "Uložena doprava";
                case OrderState.PaymentReady:
                    return "Uložena platba";
                case OrderState.CustomerReady:
                    return "Uloženy osobní údaje";
                case OrderState.Confirmed:
                    return "Potvrzená";
                case OrderState.WaitForPaid:
                    return "Zaplacená";
                case OrderState.ReadyToPickup:
                    return "Připravena k vyzvednutí";
                case OrderState.ReadyToShip:
                    return "Připravena k odeslání";
                case OrderState.Sent:
                    return "Odeslaná";
                case OrderState.Delivered:
                    return "Doručená";
                case OrderState.AgentAssign:
                    return "Čeká na přiřazení agenta";
                case OrderState.AgentsReady:
                    return "Agent připraven";
                case OrderState.AgentOnWay:
                    return "Agent na cestě";
                case OrderState.Finished:
                    return "Dokončená";
            }
            return "Neznámý";
        }

        public string GetOrderPaymentStateName()
        {
            switch (PaymentState)
            {
                case PaymentState.NotPaid:
                    return "Nezaplacená";
                case PaymentState.Paid:
                    return "Zaplacená";
            }
            return "Neznámý";
        }

        public string GetForrmattedOrderNumber()
        {
            return OrderNumber.ToString("00000000");
        }

        public bool IsReadyToConfirm() =>
            Customer != null && Customer.HasAllData()
            && CalculatedData != null && CalculatedData.HasAllData();
    }

    public class OrderCustomer {
        public string UserId { get; set; }
        public UserPersonal Personal { get; set; }
        public UserCompany Company { get; set; }

        public UserAddress GetAddress() => IsCompany() ? Company.Address : Personal.Address;
        public string GetName() => IsCompany() ? Company.CompanyName : Personal.GetFullName();
        public string GetEmail() => Personal?.Contact?.Email;
        public bool HasAllData() => UserId != null && Personal != null;
        public bool IsCompany() => Company?.CompanyId != null;
    }

    public enum OrderState {
        Created,

        CalculateReady,
        TransportReady,
        PaymentReady,
        CustomerReady,

        Confirmed,
        WaitForPaid,

        ReadyToPickup,
        ReadyToShip,
        Sent,
        Delivered,

        AgentAssign,
        AgentsReady,
        AgentOnWay,

        Finished
    }

    public enum PaymentState
    {
        NotPaid,
        Paid
    }
}
