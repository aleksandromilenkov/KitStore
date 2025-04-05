using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Entities.OrderEntityAggregate;
using KitStoreAPI.Interfaces;

namespace KitStoreAPI.Repositories
{
    public class OrderItemRepository(StoreContext _context) : IOrderItemRepository
    {
        public async Task<List<OrderItem>>? CreateOrderItems(List<CartItem> items)
        {
            var orderItems = new List<OrderItem>();
            foreach (var item in items)
            {
                if (item.Quantity >= item.Kit.QuantityInStock) return null;
                var productIdOrdered = new ProductIdOrdered() { ProductId = item.KitId, Name = item.Kit.Club.Name, PictureUrl = item.Kit.PictureUrl };
                var orderItem = new OrderItem() { ItemOrdered = productIdOrdered, Price = (long)item.Kit.Price, Quantity = item.Quantity };
                orderItems.Add(orderItem);
                item.Kit.QuantityInStock -= item.Quantity;
            }
            await _context.SaveChangesAsync();
            return orderItems;
        }
    }
}
