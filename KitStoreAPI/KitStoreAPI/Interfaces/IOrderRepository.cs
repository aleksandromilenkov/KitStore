using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<OrderDTO>> GetOrders();
        Task<OrderDTO> GetOrderById(int id);
        Task<bool> CreateOrder(CreateOrderDTO orderDTO, Cart cart);

    }
}
