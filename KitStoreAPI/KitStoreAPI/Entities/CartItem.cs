using System.ComponentModel.DataAnnotations.Schema;

namespace KitStoreAPI.Entities
{
    [Table("CartItems")]
    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int KitId { get; set; }
        public required Kit Kit { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; } = null!;
    }
}
