using System.ComponentModel.DataAnnotations.Schema;

namespace KitStoreAPI.Entities.OrderEntityAggregate
{

    [Table("OrderItems")]
    public class OrderItem
    {
        public int Id { get; set; }
        public required ProductIdOrdered ItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}
