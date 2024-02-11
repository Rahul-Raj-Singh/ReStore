namespace API.RequestHelpers;

public class ProductParams
{
    public string SortBy { get; set; }
    public string SearchTerm { get; set; }
    public string Brands{ get; set; }
    public string Types{ get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 6;
}
