namespace API.DTO;

public class BasketItemDto
{
    public Guid BasketItemId { get; set; }
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public int ProductPrice { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public string PictureUrl { get; set; }
    public int QuantityInStock { get; set; }
}