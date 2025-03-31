namespace KitStoreAPI.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        public string? UserId { get; set; }
        public User? User { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}
