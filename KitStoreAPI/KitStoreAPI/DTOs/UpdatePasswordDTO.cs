namespace KitStoreAPI.DTOs
{
    public class UpdatePasswordDTO
    {
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
