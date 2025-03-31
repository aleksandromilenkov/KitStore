namespace KitStoreAPI.DTOs
{
    public class UserReturnDTO
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}
