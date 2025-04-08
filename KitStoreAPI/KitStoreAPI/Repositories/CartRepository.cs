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

        public async Task<bool> DeleteCartByCart(Cart cart)
        {
            var cartToRemove = await _context.Carts.FindAsync(cart.Id);
            if (cartToRemove == null) return false;
            _context.Remove(cartToRemove);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Cart?> GetAsync(string userId)
        {
            var cart = await _context.Carts.Include(c=> c.Items).ThenInclude(i=>i.Kit).ThenInclude(k=> k.Club).FirstOrDefaultAsync(c=> c.UserId == userId);
            return cart;
        }

        public async Task<Cart?> GetCartByIntentId(string intentId)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.PaymentIntentId == intentId);
            return cart;
        }

        public async Task<bool> UpdateCart(Cart cart)
        {
            _context.Carts.Update(cart);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
