using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context) {
            _context = context;
        }

        // Get all products
        [HttpGet("")]
        public async Task<ActionResult<ICollection<Product>>> GetProducts() {

            return Ok(await _context.Products.ToListAsync());
        }

        // Delete a product
        [HttpDelete("{productId}")]
        public async Task<IActionResult> Delete(int productId) {
            // Get the product with the given Id
            Product? product = await _context.Products.FindAsync(productId);

            if (null == product) {
                return NotFound($"Product with ID {productId} was not found.");
            }

            // If found, remove it from the database.
            _context.Products.Remove(product);
            // Save your changes
            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProduct(int productId) {
            Product? product = await _context.Products.FindAsync(productId);

            if (null == product) {
                return NotFound($"Product with ID {productId} was not found.");
            }

            return Ok(product);
        }
    }
}
