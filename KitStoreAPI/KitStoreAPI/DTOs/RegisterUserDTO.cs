using System.ComponentModel.DataAnnotations;

namespace KitStoreAPI.DTOs
{
    public class RegisterUserDTO
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        public required string Password { get; set; }
    }
}
