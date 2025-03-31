using KitStoreAPI.Enums;

namespace KitStoreAPI.Entities
{
    public class Club
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? PublicId { get; set; }
        public string PictureUrl { get; set; } = "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=";
        public Countries Country { get; set; } = Countries.Macedonia;
        public List<Kit> Kits { get; set; } = new List<Kit>();
        public Leagues League { get; set; } = Leagues.MacedonianFirstLeague;
    }
}
