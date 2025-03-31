using System.ComponentModel.DataAnnotations;

namespace KitStoreAPI.DTOs
{
    public class LoginUserDTO
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        public required string Password { get; set; }
    }
}
