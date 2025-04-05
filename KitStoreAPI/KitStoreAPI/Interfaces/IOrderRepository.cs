using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Entities.OrderEntityAggregate;

namespace KitStoreAPI.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrders(string email);
        Task<Order?> GetOrderByPaymentIntentId(Cart cart);
        Task<Order?> GetOrderByIdAndEmail(int id, string email);
        Task<bool> CreateOrder(Order order);
        Task<bool> SaveChanges();


    }
}
