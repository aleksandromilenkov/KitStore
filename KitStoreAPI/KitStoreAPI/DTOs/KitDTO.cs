using KitStoreAPI.Entities;
using KitStoreAPI.Enums;

namespace KitStoreAPI.DTOs
{
    public class KitDTO
    {
        public int Id { get; set; }
        public int ClubId { get; set; }
        public required Club Club { get; set; }
        public string? PublicId { get; set; }
        public required string PictureUrl { get; set; }
        public int QuantityInStock { get; set; }
        public KitType KitType { get; set; } = KitType.Home;
        public required int SeasonYear { get; set; }
        public required double Price { get; set; }
    }
}
