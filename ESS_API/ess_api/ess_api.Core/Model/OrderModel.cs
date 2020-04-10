using ess_api.Core.Model.Shared;

namespace ess_api.Core.Model
{
    public class OrderModel : BaseModel
    {
        public OrderState State { get; set; } = OrderState.Created;
        public int OrderNumber { get; set; }
        public OrderCustomer Customer { get; set; }
        public OrderTransport Transport { get; set; }
        public OrderPayment Payment { get; set; }
        public CalculatedOrder CalculatedData { get; set; }

        public bool IsReadyToConfirm() =>
            Customer != null && Customer.HasAllData()
            && Transport != null && Transport.HasAllData()
            && Payment != null && Payment.HasAllData()
            && CalculatedData != null && CalculatedData.HasAllData();
    }

    public class OrderCustomer {
        public string UserId { get; set; }
        public UserPersonal Personal { get; set; }
        public UserCompany Company { get; set; }

        public bool HasAllData() => UserId != null && Personal != null;
    }

    public class OrderPayment
    {
        public string PaymentId { get; set; }
        public PaymentState State { get; set; } = PaymentState.NotPaid;
        public OrderPaymentOrder PaymentOrder { get; set; }
        public OrderCashOnDelivery OrderCashOnDelivery { get; set; }
        public PaymentModel SourceData { get; set; }

        public bool HasAllData() => PaymentId != null && SourceData != null;

        public void SetPaymentData(PaymentModel payment)
        {
            switch(payment.Type)
            {
                case PaymentType.CashOnDelivery:
                    OrderCashOnDelivery = new OrderCashOnDelivery { };
                    break;
                case PaymentType.PaymentOrder:
                    PaymentOrder = new OrderPaymentOrder { };
                    break;
            }
        }
    }

    public class OrderPaymentOrder
    {
    }

    public class OrderCashOnDelivery
    {
    }

    public class OrderTransport
    {
        public string TransportId { get; set; }
        public OrderPersonalPickupTransport PersonalPickup { get; set; }
        public OrderCzechPostTransport CzechPost { get; set; }
        public OrderZasilkovnaTransport Zasilkovna { get; set; }
        public TransportModel SourceData { get; set; }

        public bool HasAllData() => TransportId != null && SourceData != null;

        public void SetTransporttData(TransportModel transport)
        {
            switch (transport.Type)
            {
                case TransportType.CzechPost:
                    CzechPost = new OrderCzechPostTransport { };
                    break;
                case TransportType.PersonalPickup:
                    PersonalPickup = new OrderPersonalPickupTransport { };
                    break;
                case TransportType.Zasilkovna:
                    Zasilkovna = new OrderZasilkovnaTransport { };
                    break;
            }
        }
    }

    public class OrderPersonalPickupTransport
    {
    }

    public class OrderCzechPostTransport
    {
        public CzechPostTransportOption Option { get; set; }
    }

    public class OrderZasilkovnaTransport
    {
    }

    public enum OrderState {
        Created,

        CalculateReady,
        TransportReady,
        PaymentReady,
        CustomerReady,

        Confirmed,
        Paid,
        ReadyToPickup,

        ReadyToShip,
        Sent,
        Delivered,
    }

    public enum PaymentState
    {
        NotPaid,
        Paid
    }
}
