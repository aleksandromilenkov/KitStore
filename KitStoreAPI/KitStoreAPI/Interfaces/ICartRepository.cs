using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart?> GetAsync(string userId);
        Task<bool> CreateCart(string userId);
        Task<bool> DeleteCart(Cart cart);
        
    }
}
