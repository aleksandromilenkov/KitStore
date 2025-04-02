using System.ComponentModel.DataAnnotations;
using KitStoreAPI.Entities;
using KitStoreAPI.Enums;

namespace KitStoreAPI.DTOs
{
    public class CreateKitDTO
    {
        [Required]
        public int ClubId { get; set; }
        [Required]
        public required IFormFile File { get; set; }
        [Required]
        [Range(0, 500)]
        public int QuantityInStock { get; set; }
        [Required]
        public KitType KitType { get; set; }
        [Required]
        public required int SeasonYear { get; set; }
        [Range(100, double.PositiveInfinity)]
        public required double Price { get; set; }
    }
}
