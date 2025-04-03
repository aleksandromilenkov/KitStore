using KitStoreAPI.Entities;
using KitStoreAPI.Enums;

namespace KitStoreAPI.DTOs
{
    public class ClubDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? PublicId { get; set; }
        public string? PictureUrl { get; set; }
        public Countries Country { get; set; }
        public List<Kit> Kits { get; set; } 
        public Leagues League { get; set; } 
    }
}
