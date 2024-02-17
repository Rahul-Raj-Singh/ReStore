using API.Extensions;
using API.RequestHelpers;
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
    public async Task<IActionResult> Get([FromQuery] ProductParams productParams)
    {
        var products = await _productService.GetProducts(productParams);

        Response.AddPaginationHeader(products.MetaData);

        return Ok(products);

    }
    
    [HttpGet("{productId}")]
    public async Task<IActionResult> GetSingle([FromRoute] Guid productId)
    {
        
        return Ok(await _productService.GetProduct(productId));
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var obj = await _productService.GetAllBrandsAndTypes();

        return Ok(obj);
    }
}
