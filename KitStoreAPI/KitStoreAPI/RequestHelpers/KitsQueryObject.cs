using KitStoreAPI.Enums;

namespace KitStoreAPI.RequestHelpers
{
    public class KitsQueryObject
    {
        public string? OrderBy { get; set; }
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SearchTerm { get; set; }
        public int? SeasonYear { get; set; }
        public KitType? KitType { get; set; }
    }
}
