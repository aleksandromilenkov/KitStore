using KitStoreAPI.Enums;

namespace KitStoreAPI.Entities
{
    public class Kit
    {
        public int Id { get; set; }
        public int ClubId { get; set; }
        public required Club Club { get; set; }
        public string? PublicId { get; set; }
        public string PictureUrl { get; set; } = "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";
        public int QuantityInStock { get; set; } = 100;
        public required double Price { get; set; }
        public KitType KitType { get; set; } = KitType.Home;
        public required int SeasonYear { get; set; }
    }
}
