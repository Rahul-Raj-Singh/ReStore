namespace API.Entities;

public class Product
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductDescription { get; set; }
    public int ProductPrice { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public int QuantityInStock { get; set; }
    public string PictureUrl { get; set; }
    public bool IsDeleted { get; set; }
}