using KitStoreAPI.Entities;
using KitStoreAPI.Entities.OrderEntityAggregate;

namespace KitStoreAPI.Interfaces
{
    public interface IOrderItemRepository
    {
        Task<List<OrderItem>> CreateOrderItems(List<CartItem> items);
    }
}
