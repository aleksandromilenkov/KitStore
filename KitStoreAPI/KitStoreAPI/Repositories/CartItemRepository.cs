using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Repositories
{
    public class CartItemRepository(StoreContext _context) : ICartItemRepository
    {
        public async Task<bool> CreateCartItem(CartItem cartItem)
        {
            var existingItem = await _context.CartItems.FindAsync(cartItem.Id);
            if (existingItem == null) { 
                _context.CartItems.Add(cartItem);
            } else {
                existingItem.Quantity += cartItem.Quantity;
            }
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteCartItem(CartItem cartItem, int quantity)
        {
            var existingItem = await _context.CartItems.FindAsync(cartItem.Id);
            if (existingItem == null) return false;
            existingItem.Quantity -= quantity;
            if (existingItem.Quantity <= 0)
            {
                _context.CartItems.Remove(existingItem);
            }
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<CartItem?> GetAsync(int cartItemId)
        {
            var existingItem = await _context.CartItems.Include(c => c.Kit).ThenInclude(k => k.Club).FirstOrDefaultAsync(c=> c.Id == cartItemId);
            return existingItem;
        }

        public async Task<bool> UpdateCartItem(CartItem cartItem)
        {
            var existingItem = await _context.CartItems.FindAsync(cartItem.Id);
            if (existingItem == null) return false;
            _context.CartItems.Update(existingItem);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
