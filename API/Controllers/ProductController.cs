using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;
    private readonly ILogger<ProductController> _logger;

    public ProductController(ProductService productService, ILogger<ProductController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _productService.GetProducts());
    }
    
    [HttpGet("{productId}")]
    public async Task<IActionResult> GetSingle([FromRoute] Guid productId)
    {
        
        return Ok(await _productService.GetProduct(productId));
    }
}
