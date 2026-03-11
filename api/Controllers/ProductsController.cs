using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.Models;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts(
        [FromQuery] string? category,
        [FromQuery] string? company,
        [FromQuery] bool? featured)
    {
        var query = _db.Products.Include(p => p.Images).AsQueryable();

        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category == category);

        if (!string.IsNullOrEmpty(company))
            query = query.Where(p => p.Company == company);

        if (featured.HasValue)
            query = query.Where(p => p.Featured == featured.Value);

        return Ok(await query.ToListAsync());
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Product>> GetProduct(Guid id)
    {
        var product = await _db.Products
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product is null)
            return NotFound();

        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Product>> UpdateProduct(Guid id, Product updated)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null)
            return NotFound();

        product.Name = updated.Name;
        product.Price = updated.Price;
        product.Description = updated.Description;
        product.Category = updated.Category;
        product.Company = updated.Company;
        product.Colors = updated.Colors;
        product.Featured = updated.Featured;
        product.FreeShipping = updated.FreeShipping;
        product.Stock = updated.Stock;
        product.Stars = updated.Stars;
        product.Reviews = updated.Reviews;

        await _db.SaveChangesAsync();
        return Ok(product);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null)
            return NotFound();

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
