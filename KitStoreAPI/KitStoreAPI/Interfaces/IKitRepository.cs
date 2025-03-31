using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface IKitRepository
    {
        Task<Kit?> GetAsync(int kitId);
        Task<List<Kit>> GetAllKits();
        Task<bool> CreateKit(Kit kit);
        Task<bool> UpdateKit(Kit kit);
        Task<bool> DeleteKit(Kit kit);
    }
}
