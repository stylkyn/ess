
namespace ess_api.Core.Constant
{
    public static class ResponseMessages
    {
        public const string NotFound = "not-found";
        public const string BadRequest = "bad-request";

        // auth
        public const string EmailAlreadyExist = "email-already-exist";
        public const string PasswordIsNotValid = "password-is-not-valid";

        // order
        public const string CannotAssignOrderToCustomer = "cannot-assign-order-to-customer";
        public const string CannotAssignPaymentToOrder = "cannot-assign-payment-to-order";
        public const string CannotAssignTransportToOrder = "cannot-assign-transport-to-order";
    }
}
