using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface ICartItemRepository
    {
        Task<CartItem?> GetAsync(int cartItemId);
        Task<bool> CreateCartItem(CartItem cartItem);
        Task<bool> UpdateCartItem(CartItem cartItem);
        Task<bool> DeleteCartItem(CartItem cartItem, int quantity);
    }
}
