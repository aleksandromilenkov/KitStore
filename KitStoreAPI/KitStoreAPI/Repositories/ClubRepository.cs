using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Repositories
{
    public class ClubRepository(StoreContext _context) : IClubRepository
    {
        public async Task<bool> CreateClub(Club club)
        {
            var clubExist = await _context.Clubs.FindAsync(club.Id);
            if (clubExist != null) return false;
            _context.Clubs.Add(club);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> UpdateClub(Club club)
        {
            var clubExist = await _context.Clubs.FindAsync(club.Id);
            if (clubExist == null) return false;
            _context.Clubs.Update(club);
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> DeleteClub(Club club)
        {
            var clubExist = await _context.Clubs.FindAsync(club.Id);
            if (clubExist == null) return false;
            _context.Clubs.Remove(club);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Club>> GetAllClubs()
        {
            return await _context.Clubs.ToListAsync();
        }

        public async Task<Club?> GetAsync(int clubId)
        {
            return await _context.Clubs.FindAsync(clubId);
        }
    }
}
