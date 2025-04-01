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
            var existingCart = await _context.Carts.FirstOrDefaultAsync(c=> c.UserId == userId);
            if(existingCart != null) { return false; }
            _context.Add(new Cart() { UserId = userId });
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteCart(string userId)
        {
            var cartToRemove = await _context.Carts.FirstOrDefaultAsync(c=>c.UserId == userId);
            if (cartToRemove == null) return false;
            _context.Remove(cartToRemove);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Cart?> GetAsync(string userId)
        {
            var cart = await _context.Carts.Include(c=> c.Items).FirstOrDefaultAsync(c=> c.UserId == userId);
            return cart;
        }
    }
}
