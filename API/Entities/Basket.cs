namespace API.Entities;

public class Basket
{
    public Guid BasketId { get; set; } = Guid.NewGuid();
    public Guid BuyerId { get; set; }
    // Navigation Property
    public List<BasketItem> BasketItems { get; set; } = new();
    public void UpsertItem(Product product, int quantity)
    {
        var existingItem = BasketItems.FirstOrDefault(x => x.Product.ProductId == product.ProductId);

        if (existingItem is null)
        {
            BasketItems.Add(new()
            {
                Basket = this,
                Product = product,
                Quantity = quantity
            });
        }
        else
        {
            existingItem.Quantity += quantity;
        }
    }

    public void RemoveItem(Product product, int quantity)
    {
        var existingItem = BasketItems.FirstOrDefault(x => x.Product.ProductId == product.ProductId);

        if (existingItem is null) return;

        if (quantity > existingItem.Quantity)
            throw new ApplicationException(
                $"Received request to remove {quantity} items, but basket has only {existingItem.Quantity} items!");

       existingItem.Quantity -= quantity;

       if (existingItem.Quantity == 0) BasketItems.Remove(existingItem);
    }
}
