using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Entities
{
    [Owned]
    public class AppCoupon
    {
        [Required]
        public string? CouponId { get; set; }
        [Required]
        public string Name { get; set; } = "";
        public long? AmountOff { get; set; }
        public decimal? PercentOff { get; set; }
        [Precision(5, 2)]
        public int PromotionCode { get; set; }
    }
}
