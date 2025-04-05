using System.ComponentModel.DataAnnotations;

namespace KitStoreAPI.DTOs
{
    public class UpdateImageDTO
    {
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
