using System.ComponentModel.DataAnnotations;

namespace KitStoreAPI.DTOs
{
    public class RoleAssignDTO
    {
        [Required]
        public required string UserId { get; set; }
        [Required]
        public required string Role { get; set; }
    }
}
