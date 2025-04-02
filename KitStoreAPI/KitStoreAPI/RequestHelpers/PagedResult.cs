namespace KitStoreAPI.RequestHelpers
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public PaginationMetadata Pagination { get; set; }

        public PagedResult(List<T> items, PaginationMetadata pagination)
        {
            Items = items;
            Pagination = pagination;
        }
    }

}
