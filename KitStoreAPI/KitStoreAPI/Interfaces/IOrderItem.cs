using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface IOrderItem
    {
        Task<List<IOrderItem>> CreateOrderItems(List<CartItem> items);
    }
}
