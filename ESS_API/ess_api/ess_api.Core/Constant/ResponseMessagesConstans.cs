
namespace ess_api.Core.Constant
{
    public static class ResponseMessagesConstans
    {
        public const string NotFound = "not-found";
        public const string BadRequest = "bad-request";
        public const string RequestCannotBeNullMissingProperties = "request-cannot-be-null-missing-properties";

        // auth
        public const string EmailAlreadyExist = "email-already-exist";
        public const string PasswordIsNotValid = "password-is-not-valid";

        // order
        public const string CannotFindOrder = "cannot-find-orderr";
        public const string CannotAssignOrderToCustomer = "cannot-assign-order-to-customer";
        public const string CannotAssignPaymentToOrder = "cannot-assign-payment-to-order";
        public const string CannotAssignTransportToOrder = "cannot-assign-transport-to-order";
        public const string AgentHasNotPermissionSetThisState = "agent-has-not-permission-set-this-state";
        public const string MissingGoodsInStock = "missin-goods-in-stock";
        public const string CannotFindProductInOrder = "cannot-find-product-in-order";

        // user
        public const string CannotDeleteYourself = "cannot-delete-yourselft";

        // email
        public const string EmailCannotBeSend = "email-cannot-be-send";

    }
}
