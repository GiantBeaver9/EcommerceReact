using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceApi.Models;

public class Product
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string Name { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;

    public List<string> Colors { get; set; } = new();
    public List<ProductImage> Images { get; set; } = new();

    public bool Featured { get; set; }
    public bool FreeShipping { get; set; }

    public int Stock { get; set; }
    public double Stars { get; set; }
    public int Reviews { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ProductImage
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ProductId { get; set; }

    [Required]
    public string Url { get; set; } = string.Empty;

    public string? Filename { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public Product Product { get; set; } = null!;
}
