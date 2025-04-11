using System.ComponentModel.DataAnnotations;

namespace KitStoreAPI.DTOs
{
    public class LoginUserDTO
    {
        [Required]
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
