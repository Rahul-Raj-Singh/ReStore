using API.DTO;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BasketController : ControllerBase
{
    private readonly BasketService _basketService;
    private readonly ILogger<BasketController> _logger;

    public BasketController(BasketService basketService, ILogger<BasketController> logger)
    {
        _basketService = basketService;
        _logger = logger;
    }

    [HttpGet(Name=nameof(GetBasket))]
    public async Task<IActionResult> GetBasket()
    {
        var buyerIdCookie = Request.Cookies["buyerId"];

        if (string.IsNullOrEmpty(buyerIdCookie))
            return BadRequest(new ProblemDetails { Title = "buyerId is not valid guid!" });

        var basket = await _basketService.GetBasket(Guid.Parse(buyerIdCookie));

        if (basket is null) return NotFound();

        return Ok(MapBasketToDto(basket));
    }


    [HttpPost]
    public async Task<IActionResult> AddItemToBasket(Guid productId, int quantity)
    {
        var buyerIdCookie = Request.Cookies["buyerId"];

        Guid buyerId;
        if (string.IsNullOrEmpty(buyerIdCookie))
        {
            buyerId = Guid.NewGuid(); // TODO: replace with identity once implemented
            
            var cookieOptions = new CookieOptions() {IsEssential=true, Expires = DateTime.Now.AddDays(1), HttpOnly=false};
            Response.Cookies.Append("buyerId", buyerId.ToString(), cookieOptions);
        }
        else
        {
            buyerId = Guid.Parse(buyerIdCookie);
        }

        var basket = await _basketService.AddItemToBasket(buyerId, productId, quantity);

        return CreatedAtRoute(nameof(GetBasket), MapBasketToDto(basket));
    }

    [HttpDelete]
    public async Task<IActionResult> RemoveItemFromBasket(Guid productId, int quantity)
    {
        var buyerIdCookie = Request.Cookies["buyerId"];

        if (string.IsNullOrEmpty(buyerIdCookie))
            return BadRequest(new ProblemDetails{Title = "buyerId is not valid guid!"});

        await _basketService.RemoveItemFromBasket(Guid.Parse(buyerIdCookie), productId, quantity);
        
        return NoContent();
    }

    private static BasketDto MapBasketToDto(Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            BuyerId = basket.BuyerId,
            BasketItems = basket.BasketItems.Select(x => new BasketItemDto
            {
                BasketItemId = x.BasketItemId,
                Quantity = x.Quantity,
                ProductId = x.Product.ProductId,
                ProductName = x.Product.ProductName,
                ProductDescription = x.Product.ProductDescription,
                ProductPrice = x.Product.ProductPrice,
                ProductType = x.Product.ProductType,
                ProductBrand = x.Product.ProductBrand,
                QuantityInStock = x.Product.QuantityInStock,
                PictureUrl = x.Product.PictureUrl
            }).ToList()
        };
    }
}
