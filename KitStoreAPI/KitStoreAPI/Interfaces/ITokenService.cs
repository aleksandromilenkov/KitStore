using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}
