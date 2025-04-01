using KitStoreAPI.Entities;
using KitStoreAPI.RequestHelpers;

namespace KitStoreAPI.Interfaces
{
    public interface IKitRepository
    {
        Task<Kit?> GetAsync(int kitId);
        Task<Kit?> GetAsyncAsNoTracking(int kitId);
        Task<List<Kit>> GetAllKits(KitsQueryObject kitsQueryObject);
        Task<bool> CreateKit(Kit kit);
        Task<bool> UpdateKit(Kit kit);
        Task<bool> DeleteKit(Kit kit);
    }
}
