namespace KitStoreAPI.Entities.OrderEntityAggregate
{
    public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymentFailed,
        PaymentMismatch
    }
}
