namespace API.Entities;

public class BasketItem
{
    public Guid BasketItemId { get; set; } = Guid.NewGuid();
    public int Quantity { get; set; }

    // Navigation property
    // public Guid BasketId { get; set; }
    public Basket Basket { get; set; }
    // public Guid ProductId { get; set; }
    public Product Product { get; set; }
}