namespace KitStoreAPI.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        public required string UserId { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }
        public AppCoupon? AppCoupon { get; set; }
        public User User { get; set; } = null!;
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}
