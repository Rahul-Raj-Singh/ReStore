using API.DataAccess;
using API.Entities;
using API.RequestHelpers;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class ProductService
{
    private readonly StoreContext _context;
    private readonly ILogger<ProductService> _logger;

    public ProductService(StoreContext context, ILogger<ProductService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<PagedList<Product>> GetProducts(ProductParams productParams)
    {
        var query = BuildQuery(productParams);

        query = query.Where(x => !x.IsDeleted);

        var pagedList = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

        return pagedList;
    }

    public async Task<Product> GetProduct(Guid productId)
    {
        var product = await _context.Products.FindAsync(productId);

        return product;
    }

    public async Task<object> GetAllBrandsAndTypes()
    {
        var brands = await _context.Products.Select(x => x.ProductBrand).Distinct().ToListAsync();
        var types = await _context.Products.Select(x => x.ProductType).Distinct().ToListAsync();

        return new {brands, types};
    }

    private IQueryable<Product> BuildQuery(ProductParams productParams)
    {
        IQueryable<Product> query = _context.Products;

        // search term
        if (!string.IsNullOrWhiteSpace(productParams.SearchTerm))
        {
            query = query.Where(x => x.ProductName.Contains(productParams.SearchTerm.Trim()));
        }

        // filter
        if (!string.IsNullOrWhiteSpace(productParams.Brands))
        {
            var brands = productParams.Brands.ToLower().Split(",");

            query = query.Where(x => brands.Contains(x.ProductBrand.ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(productParams.Types))
        {
            var types = productParams.Types.ToLower().Split(",");

            query = query.Where(x => types.Contains(x.ProductType.ToLower()));
        }

        // sort
        query = productParams.SortBy?.ToLower() switch
        {
            "price" => query.OrderBy(x => x.ProductPrice),
            "pricedesc" => query.OrderByDescending(x => x.ProductPrice),
            _ => query.OrderBy(x => x.ProductName),
        };

        return query;
    }
}
