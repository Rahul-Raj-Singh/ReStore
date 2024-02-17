using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess;

public class StoreContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public StoreContext(DbContextOptions<StoreContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(x => 
        {
            x.ToTable(nameof(Product));
            x.HasKey(y => y.ProductId);
            x.Property(y => y.ProductId).ValueGeneratedNever();
        });

        modelBuilder.Entity<Basket>(x => 
        {
            x.ToTable(nameof(Basket));
            x.HasKey(y => y.BasketId);
            x.Property(y => y.BasketId).ValueGeneratedNever();
        });

        modelBuilder.Entity<BasketItem>(x => 
        {
            x.ToTable(nameof(BasketItem));
            x.HasKey(y => y.BasketItemId);
            x.Property(y => y.BasketItemId).ValueGeneratedNever();

            x.HasOne(y => y.Product)
            .WithOne()
            .HasForeignKey<BasketItem>("ProductId");

            x.HasOne(y => y.Basket)
            .WithMany(y => y.BasketItems)
            .HasForeignKey("BasketId");
        });

        
    }
}