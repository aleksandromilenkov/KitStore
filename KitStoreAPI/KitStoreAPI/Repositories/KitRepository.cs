using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Repositories
{
    public class KitRepository(StoreContext _context) : IKitRepository
    {
        public async Task<bool> CreateKit(Kit kit)
        {
            var existingKit = await _context.Kits.FindAsync(kit.Id);
            if (existingKit != null) return false;
            _context.Kits.Add(kit);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteKit(Kit kit)
        {
            var existingKit = await _context.Kits.FindAsync(kit.Id);
            if (existingKit == null) return false;
            _context.Kits.Remove(kit);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Kit>> GetAllKits()
        {
            return await _context.Kits.ToListAsync();
        }

        public async Task<Kit?> GetAsync(int kitId)
        {
           return await _context.Kits.FirstOrDefaultAsync(k => k.Id == kitId);
        }

        public async Task<bool> UpdateKit(Kit kit)
        {
            var existingKit = await _context.Kits.FindAsync(kit.Id);
            if (existingKit != null) return false;
            _context.Kits.Update(kit);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
