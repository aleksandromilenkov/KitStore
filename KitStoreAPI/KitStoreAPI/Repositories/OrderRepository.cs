using KitStoreAPI.Data;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Repositories
{
    public class OrderRepository(StoreContext _context) : IOrderRepository
    {
        public async Task<bool> CreateOrder(CreateOrderDTO orderDTO, Cart cart)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDTO> GetOrderById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderDTO>> GetOrders()
        {
            throw new NotImplementedException();
        }
    }
}
