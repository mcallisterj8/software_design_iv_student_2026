using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class Product {
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    public string? Description { get; set; }

    [Required]
    public decimal Price { get; set; }

    public bool IsAvailable { get; set; }
}