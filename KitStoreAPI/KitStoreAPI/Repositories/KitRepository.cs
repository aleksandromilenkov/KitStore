using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using KitStoreAPI.RequestHelpers;
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

        public async Task<List<Kit>> GetAllKits(KitsQueryObject kitsQueryObject)
        {
            var kits = _context.Kits.Include(k => k.Club).AsQueryable();
            if(!string.IsNullOrEmpty(kitsQueryObject.SearchTerm)) { 
                kits = kits.Where(k => k.Club.Name.Contains(kitsQueryObject.SearchTerm));
            }
            if (kitsQueryObject.SeasonYear != null)
            {
                kits = kits.Where(k => k.SeasonYear == kitsQueryObject.SeasonYear);
            }
            if (kitsQueryObject.KitType != null)
            {
                kits = kits.Where(k => k.KitType == kitsQueryObject.KitType);
            }
            if (!string.IsNullOrWhiteSpace(kitsQueryObject.OrderBy))
            {
                if (kitsQueryObject.OrderBy.Equals("Price", StringComparison.OrdinalIgnoreCase))
                { }
            }
            var skipNumber = (kitsQueryObject.PageNumber - 1) * kitsQueryObject.PageSize;
            return await kits.Skip(skipNumber).Take(kitsQueryObject.PageSize).ToListAsync();
        }

        public async Task<Kit?> GetAsync(int kitId)
        {
           return await _context.Kits.FirstOrDefaultAsync(k => k.Id == kitId);
        }

        public async Task<Kit?> GetAsyncAsNoTracking(int kitId)
        {
            return await _context.Kits.AsNoTracking().FirstOrDefaultAsync(k => k.Id == kitId);
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
