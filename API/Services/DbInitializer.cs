using API.DataAccess;
using API.Entities;

namespace API.Services;

public static class DbInitializer
{
    public static void SeedDb(StoreContext context)
    {
        if (context.Products.Any()) return;

        var seedProducts = new List<Product>
        {
            new Product
            {
                ProductName = "Angular Speedster Board 2000",
                ProductDescription =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 20000,
                PictureUrl = "/images/products/sb-ang1.png",
                ProductBrand = "Angular",
                ProductType = "Boards",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Green Angular Board 3000",
                ProductDescription = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                ProductPrice = 15000,
                PictureUrl = "/images/products/sb-ang2.png",
                ProductBrand = "Angular",
                ProductType = "Boards",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Core Board Speed Rush 3",
                ProductDescription =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                ProductPrice = 18000,
                PictureUrl = "/images/products/sb-core1.png",
                ProductBrand = "NetCore",
                ProductType = "Boards",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Net Core Super Board",
                ProductDescription =
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                ProductPrice = 30000,
                PictureUrl = "/images/products/sb-core2.png",
                ProductBrand = "NetCore",
                ProductType = "Boards",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "React Board Super Whizzy Fast",
                ProductDescription =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 25000,
                PictureUrl = "/images/products/sb-react1.png",
                ProductBrand = "React",
                ProductType = "Boards",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "ProductTypescript Entry Board",
                ProductDescription =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 12000,
                PictureUrl = "/images/products/sb-ts1.png",
                ProductBrand = "ProductTypeScript",
                ProductType = "Boards",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Core Blue Hat",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 1000,
                PictureUrl = "/images/products/hat-core1.png",
                ProductBrand = "NetCore",
                ProductType = "Hats",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Green React Woolen Hat",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 8000,
                PictureUrl = "/images/products/hat-react1.png",
                ProductBrand = "React",
                ProductType = "Hats",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Purple React Woolen Hat",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 1500,
                PictureUrl = "/images/products/hat-react2.png",
                ProductBrand = "React",
                ProductType = "Hats",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Blue Code Gloves",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 1800,
                PictureUrl = "/images/products/glove-code1.png",
                ProductBrand = "VS Code",
                ProductType = "Gloves",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Green Code Gloves",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 1500,
                PictureUrl = "/images/products/glove-code2.png",
                ProductBrand = "VS Code",
                ProductType = "Gloves",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Purple React Gloves",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 1600,
                PictureUrl = "/images/products/glove-react1.png",
                ProductBrand = "React",
                ProductType = "Gloves",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Green React Gloves",
                ProductDescription =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 1400,
                PictureUrl = "/images/products/glove-react2.png",
                ProductBrand = "React",
                ProductType = "Gloves",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Redis Red Boots",
                ProductDescription =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                ProductPrice = 25000,
                PictureUrl = "/images/products/boot-redis1.png",
                ProductBrand = "Redis",
                ProductType = "Boots",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Core Red Boots",
                ProductDescription =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                ProductPrice = 18999,
                PictureUrl = "/images/products/boot-core2.png",
                ProductBrand = "NetCore",
                ProductType = "Boots",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Core Purple Boots",
                ProductDescription =
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                ProductPrice = 19999,
                PictureUrl = "/images/products/boot-core1.png",
                ProductBrand = "NetCore",
                ProductType = "Boots",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Angular Purple Boots",
                ProductDescription = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                ProductPrice = 15000,
                PictureUrl = "/images/products/boot-ang2.png",
                ProductBrand = "Angular",
                ProductType = "Boots",
                QuantityInStock = 100
            },
            new Product
            {
                ProductName = "Angular Blue Boots",
                ProductDescription =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                ProductPrice = 18000,
                PictureUrl = "/images/products/boot-ang1.png",
                ProductBrand = "Angular",
                ProductType = "Boots",
                QuantityInStock = 100
            }
        };

        context.Products.AddRange(seedProducts);
        context.SaveChanges();
    }
}
