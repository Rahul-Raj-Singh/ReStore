using API.DataAccess;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class BasketService
{
    private readonly StoreContext _context;
    private readonly ProductService _productService;

    public BasketService(StoreContext context, ProductService productService)
    {
        _context = context;
        _productService = productService;
    }

    public async Task<Basket> GetBasket(Guid buyerId)
    {
        var basket = await _context.Baskets
            .Include(x => x.BasketItems)
            .ThenInclude(y => y.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);

        return basket;
    }
    
    public async Task<Basket> AddItemToBasket(Guid buyerId, Guid productId, int quantity)
    {
        var existingBasket = await GetBasket(buyerId);

        if (existingBasket is null)
        {
            existingBasket = new Basket {BuyerId = buyerId};
            _context.Baskets.Add(existingBasket);
        }
        
        var existingProduct = await _productService.GetProduct(productId);

        if (existingProduct is null)
            throw new ApplicationException("Cannot find product with Id: " + productId);
        
        existingBasket.UpsertItem(existingProduct, quantity);

        await _context.SaveChangesAsync();

        return existingBasket;
    }

    public async Task<bool> RemoveItemFromBasket(Guid buyerId, Guid productId, int quantity)
    {
        var existingBasket = await GetBasket(buyerId);

        if (existingBasket is null)
            throw new ApplicationException("Cannot find basket for buyer with Id: " + buyerId);
        
        var existingProduct = await _productService.GetProduct(productId);

        if (existingProduct is null)
            throw new ApplicationException("Cannot find product with Id: " + productId);


        var itemsBefore = existingBasket.BasketItems.ToList();

        existingBasket.RemoveItem(existingProduct, quantity);

        var itemsRemoved = itemsBefore.Except(existingBasket.BasketItems);

        foreach(var removedItem in itemsRemoved) _context.Entry(removedItem).State = EntityState.Deleted;

        return await _context.SaveChangesAsync() > 0;
    }


}
