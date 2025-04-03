using System.ComponentModel.DataAnnotations;
using KitStoreAPI.Enums;

namespace KitStoreAPI.DTOs
{
    public class UpdateClubDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public IFormFile? File { get; set; }
        [Required]
        public Countries Country { get; set; }
        [Required]
        public Leagues League { get; set; }
    }
}
