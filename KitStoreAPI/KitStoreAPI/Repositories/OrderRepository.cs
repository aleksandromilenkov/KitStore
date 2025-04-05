using KitStoreAPI.Data;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Entities.OrderEntityAggregate;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Repositories
{
    public class OrderRepository(StoreContext _context) : IOrderRepository
    {
        public async Task<bool> CreateOrder(Order order)
        {
            _context.Add(order);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Order?> GetOrderByIdAndEmail(int id, string email)
        {
            var order = await _context.Orders.Where(o => o.BuyerEmail == email && o.Id == id).FirstOrDefaultAsync();
            return order;
        }

        public async Task<Order?> GetOrderByPaymentIntentId(Cart cart)
        {
            var order = await _context.Orders.Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.PaymentIntentId == cart.PaymentIntentId);
            return order;
        }

        public async Task<List<Order>> GetOrders(string email)
        {
            var orders = await _context.Orders
                .Where(o => o.BuyerEmail == email)
                .ToListAsync();
            return orders;
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
