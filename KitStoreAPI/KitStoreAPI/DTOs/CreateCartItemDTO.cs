using KitStoreAPI.Entities;

namespace KitStoreAPI.DTOs
{
    public class CreateCartItemDTO
    {
        public int Quantity { get; set; }
        public int KitId { get; set; }
        public int CartId { get; set; }
    }
}
