using KitStoreAPI.Entities.OrderEntityAggregate;

namespace KitStoreAPI.DTOs
{
    public class CreateOrderDTO
    {
        public required ShippingAddress ShippingAddress { get; set; }
        public required PaymentSummary PaymentSummary { get; set; }
    }
}
