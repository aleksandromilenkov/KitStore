using KitStoreAPI.Entities;
using KitStoreAPI.Enums;

namespace KitStoreAPI.DTOs
{
    public class CreateClubDTO
    {
        public required string Name { get; set; }
        public IFormFile File { get; set; }
        public Countries Country { get; set; }
        public Leagues League { get; set; }
    }
}
