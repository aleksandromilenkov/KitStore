﻿using System.Linq;
using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Enums;
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

        public async Task<PagedResult<Kit>> GetAllKits(KitsQueryObject kitsQueryObject)
        {
            var kitsQuery = _context.Kits.Include(k => k.Club).AsQueryable();
            if(!string.IsNullOrEmpty(kitsQueryObject.SearchTerm)) {
                kitsQuery = kitsQuery.Where(k => k.Club.Name.Contains(kitsQueryObject.SearchTerm));
            }
            if (kitsQueryObject.SeasonYear != null)
            {
                kitsQuery = kitsQuery.Where(k => k.SeasonYear == kitsQueryObject.SeasonYear);
            }
            if (kitsQueryObject.KitType != null)
            {
                kitsQuery = kitsQuery.Where(k => k.KitType == kitsQueryObject.KitType);
            }
            if (!string.IsNullOrEmpty(kitsQueryObject.Leagues))
            {
                var leagueStrings = kitsQueryObject.Leagues.Split(",", StringSplitOptions.RemoveEmptyEntries);
                var leagueEnums = leagueStrings
                .Select(l => Enum.TryParse<Leagues>(l, true, out var parsed) ? parsed : (Leagues?)null)
                .Where(l => l != null)
                    .Select(l => l.Value)
                    .ToList();

                kitsQuery = kitsQuery.Where(k => leagueEnums.Contains(k.Club.League));

            }
            if (!string.IsNullOrWhiteSpace(kitsQueryObject.OrderBy))
            {
                if (kitsQueryObject.OrderBy.Equals("Price", StringComparison.OrdinalIgnoreCase)){
                    kitsQuery = kitsQueryObject.IsDescending ? kitsQuery.OrderByDescending(k => k.Price) : kitsQuery.OrderBy(k => k.Price);
                }
                if (kitsQueryObject.OrderBy.Equals("SeasonYear", StringComparison.OrdinalIgnoreCase))
                {
                    kitsQuery = kitsQueryObject.IsDescending ? kitsQuery.OrderByDescending(k => k.SeasonYear) : kitsQuery.OrderBy(k => k.SeasonYear);
                }
                if (kitsQueryObject.OrderBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    kitsQuery = kitsQueryObject.IsDescending ? kitsQuery.OrderByDescending(k => k.Club.Name) : kitsQuery.OrderBy(k => k.Club.Name);
                }
            }
            int totalItems = await kitsQuery.CountAsync();
            var skipNumber = (kitsQueryObject.PageNumber - 1) * kitsQueryObject.PageSize;
            var kits = await kitsQuery.Skip(skipNumber).Take(kitsQueryObject.PageSize).ToListAsync();
            var paginationMetadata = new PaginationMetadata(totalItems, kitsQueryObject.PageNumber, kitsQueryObject.PageSize);

            var resultToReturn = new PagedResult<Kit>(kits, paginationMetadata);
            return resultToReturn;
        }

        public async Task<Kit?> GetAsync(int kitId)
        {
           return await _context.Kits.Include(k=> k.Club).FirstOrDefaultAsync(k => k.Id == kitId);
        }

        public async Task<Kit?> GetAsyncAsNoTracking(int kitId)
        {
            return await _context.Kits.AsNoTracking().FirstOrDefaultAsync(k => k.Id == kitId);
        }

        public async Task<bool> UpdateKit(Kit kit)
        {
            var existingKit = await _context.Kits.FindAsync(kit.Id);
            if (existingKit == null) return false;
            _context.Kits.Update(kit);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
