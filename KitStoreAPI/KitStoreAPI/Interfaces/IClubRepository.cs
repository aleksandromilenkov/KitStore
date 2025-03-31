using KitStoreAPI.Entities;

namespace KitStoreAPI.Interfaces
{
    public interface IClubRepository
    {
        Task<Club?> GetAsync(int clubId);
        Task<List<Club>> GetAllClubs();
        Task<bool> CreateClub(Club club);
        Task<bool> UpdateClub(Club club);
        Task<bool> DeleteClub(Club club);
    }
}
