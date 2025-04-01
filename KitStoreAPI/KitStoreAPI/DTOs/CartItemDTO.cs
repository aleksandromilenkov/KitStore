using KitStoreAPI.Entities;

namespace KitStoreAPI.DTOs
{
    public class CartItemDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int KitId { get; set; }
        public required Kit Kit { get; set; }
        public int CartId { get; set; }
    }
}
