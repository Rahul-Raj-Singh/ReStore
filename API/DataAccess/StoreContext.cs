using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess;

public class StoreContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(x => 
        {
            x.ToTable(nameof(Product));
            x.HasKey(y => y.ProductId);
        });
        
    }
}