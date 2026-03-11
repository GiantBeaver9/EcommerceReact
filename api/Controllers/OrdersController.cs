using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.DTOs;
using EcommerceApi.Models;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _db;
    private const decimal TaxRate = 0.0825m; // 8.25% tax
    private const decimal ShippingThreshold = 50m;
    private const decimal ShippingFlatRate = 5.99m;

    public OrdersController(AppDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Get all orders with optional filtering and pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<OrderListResponse>> GetOrders(
        [FromQuery] string? email,
        [FromQuery] OrderStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _db.Orders.Include(o => o.Items).AsQueryable();

        if (!string.IsNullOrEmpty(email))
            query = query.Where(o => o.CustomerEmail == email);

        if (status.HasValue)
            query = query.Where(o => o.Status == status.Value);

        var totalCount = await query.CountAsync();

        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new OrderListResponse
        {
            Orders = orders.Select(MapToResponse).ToList(),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }

    /// <summary>
    /// Get a single order by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OrderResponse>> GetOrder(Guid id)
    {
        var order = await _db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
            return NotFound();

        return Ok(MapToResponse(order));
    }

    /// <summary>
    /// Create a new order
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<OrderResponse>> CreateOrder(CreateOrderRequest request)
    {
        if (request.Items.Count == 0)
            return BadRequest("Order must have at least one item.");

        var order = new Order
        {
            CustomerEmail = request.CustomerEmail,
            CustomerName = request.CustomerName,
            ShippingAddress = request.ShippingAddress,
            City = request.City,
            State = request.State,
            ZipCode = request.ZipCode,
            StripePaymentIntentId = request.StripePaymentIntentId,
            Items = request.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Name = i.Name,
                Image = i.Image,
                Color = i.Color,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        // Calculate totals
        order.Subtotal = order.Items.Sum(i => i.Price * i.Quantity);
        order.Tax = Math.Round(order.Subtotal * TaxRate, 2);
        order.ShippingCost = order.Subtotal >= ShippingThreshold ? 0 : ShippingFlatRate;
        order.Total = order.Subtotal + order.Tax + order.ShippingCost;

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, MapToResponse(order));
    }

    /// <summary>
    /// Update an order's status
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    public async Task<ActionResult<OrderResponse>> UpdateOrderStatus(Guid id, UpdateOrderStatusRequest request)
    {
        var order = await _db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
            return NotFound();

        order.Status = request.Status;
        order.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return Ok(MapToResponse(order));
    }

    /// <summary>
    /// Cancel an order (only if still Pending or Confirmed)
    /// </summary>
    [HttpPost("{id:guid}/cancel")]
    public async Task<ActionResult<OrderResponse>> CancelOrder(Guid id)
    {
        var order = await _db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
            return NotFound();

        if (order.Status is not (OrderStatus.Pending or OrderStatus.Confirmed))
            return BadRequest($"Cannot cancel order with status '{order.Status}'.");

        order.Status = OrderStatus.Cancelled;
        order.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return Ok(MapToResponse(order));
    }

    /// <summary>
    /// Delete an order (admin)
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteOrder(Guid id)
    {
        var order = await _db.Orders.FindAsync(id);

        if (order is null)
            return NotFound();

        _db.Orders.Remove(order);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private static OrderResponse MapToResponse(Order order) => new()
    {
        Id = order.Id,
        CustomerEmail = order.CustomerEmail,
        CustomerName = order.CustomerName,
        ShippingAddress = order.ShippingAddress,
        City = order.City,
        State = order.State,
        ZipCode = order.ZipCode,
        Status = order.Status,
        Subtotal = order.Subtotal,
        Tax = order.Tax,
        ShippingCost = order.ShippingCost,
        Total = order.Total,
        StripePaymentIntentId = order.StripePaymentIntentId,
        CreatedAt = order.CreatedAt,
        UpdatedAt = order.UpdatedAt,
        Items = order.Items.Select(i => new OrderItemResponse
        {
            Id = i.Id,
            ProductId = i.ProductId,
            Name = i.Name,
            Image = i.Image,
            Color = i.Color,
            Quantity = i.Quantity,
            Price = i.Price
        }).ToList()
    };
}
