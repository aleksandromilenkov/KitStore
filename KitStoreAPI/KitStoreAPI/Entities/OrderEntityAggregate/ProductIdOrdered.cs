using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Entities.OrderEntityAggregate
{
    [Owned]
    public class ProductIdOrdered
    {
        public int ProductId { get; set; }
        public required string Name { get; set; }
        public required string PictureUrl { get; set; }
    }
}
