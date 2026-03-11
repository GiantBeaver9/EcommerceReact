using EcommerceApi.Models;

namespace EcommerceApi.DTOs;

// --- Request DTOs ---

public record CreateOrderRequest
{
    public required string CustomerEmail { get; init; }
    public required string CustomerName { get; init; }
    public required string ShippingAddress { get; init; }
    public required string City { get; init; }
    public required string State { get; init; }
    public required string ZipCode { get; init; }
    public required List<OrderItemRequest> Items { get; init; }
    public string? StripePaymentIntentId { get; init; }
}

public record OrderItemRequest
{
    public required string ProductId { get; init; }
    public required string Name { get; init; }
    public string? Image { get; init; }
    public string? Color { get; init; }
    public required int Quantity { get; init; }
    public required decimal Price { get; init; }
}

public record UpdateOrderStatusRequest
{
    public required OrderStatus Status { get; init; }
}

// --- Response DTOs ---

public record OrderResponse
{
    public Guid Id { get; init; }
    public string CustomerEmail { get; init; } = string.Empty;
    public string CustomerName { get; init; } = string.Empty;
    public string ShippingAddress { get; init; } = string.Empty;
    public string City { get; init; } = string.Empty;
    public string State { get; init; } = string.Empty;
    public string ZipCode { get; init; } = string.Empty;
    public OrderStatus Status { get; init; }
    public decimal Subtotal { get; init; }
    public decimal Tax { get; init; }
    public decimal ShippingCost { get; init; }
    public decimal Total { get; init; }
    public string? StripePaymentIntentId { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public List<OrderItemResponse> Items { get; init; } = new();
}

public record OrderItemResponse
{
    public Guid Id { get; init; }
    public string ProductId { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string? Image { get; init; }
    public string? Color { get; init; }
    public int Quantity { get; init; }
    public decimal Price { get; init; }
}

public record OrderListResponse
{
    public List<OrderResponse> Orders { get; init; } = new();
    public int TotalCount { get; init; }
    public int Page { get; init; }
    public int PageSize { get; init; }
}
