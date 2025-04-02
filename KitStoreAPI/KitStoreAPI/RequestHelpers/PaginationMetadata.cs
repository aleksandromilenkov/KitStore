namespace KitStoreAPI.RequestHelpers
{
    public class PaginationMetadata
    {
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PaginationMetadata(int totalItems, int pageNumber, int pageSize)
        {
            TotalItems = totalItems;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        }
    }

}
