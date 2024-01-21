using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataAccess;
using API.Entities;
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

    public async Task<List<Product>> GetProducts()
    {
        var products = await _context.Products.Where(x => !x.IsDeleted).ToListAsync();

        return products;
    }
}
