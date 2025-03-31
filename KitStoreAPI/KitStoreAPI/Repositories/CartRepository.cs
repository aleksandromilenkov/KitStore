using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Repositories
{
    public class CartRepository(StoreContext _context) : ICartRepository
    {
        public async Task<bool> CreateCart(string userId)
        {
            _context.Add(new Cart() { UserId = userId });
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteCart(Cart cart)
        {
            _context.Remove(cart);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Cart?> GetAsync(string userId)
        {
            var cart = await _context.Carts.FindAsync(userId);
            return cart;
        }
    }
}
