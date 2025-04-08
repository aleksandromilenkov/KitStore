using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart?> GetAsync(string userId);
        Task<Cart?> GetCartByIntentId(string intentId);
        Task<bool> CreateCart(string userId);
        Task<bool> UpdateCart(Cart cart);
        Task<bool> DeleteCartByCart(Cart cart);
        Task<bool> DeleteCart(string userId);
        
    }
}
