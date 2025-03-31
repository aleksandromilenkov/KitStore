using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;

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

        public async Task<bool> DeleteCartItem(CartItem cartItem)
        {
            var existingItem = await _context.CartItems.FindAsync(cartItem.Id);
            if (existingItem == null) return false;
            _context.CartItems.Remove(existingItem);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<CartItem?> GetAsync(string cartItemId)
        {
            var existingItem = await _context.CartItems.FindAsync(cartItemId);
            return existingItem != null ? existingItem : null;
        }
    }
}
