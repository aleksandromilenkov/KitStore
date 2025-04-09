using System.Net;
using Microsoft.AspNetCore.Identity;

namespace KitStoreAPI.Entities
{
    public class User : IdentityUser
    {
        public Address? Address { get; set; }
        public string? PictureUrl { get; set; }
        public string? PublicId { get; set; }
        // 1:1 Relationship
        public Cart? Cart { get; set; }
    }
}
