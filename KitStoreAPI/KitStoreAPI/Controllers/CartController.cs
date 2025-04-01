using System.Security.Claims;
using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController(ICartRepository _cartRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");
            var cart = await _cartRepository.GetAsync(userId);
            if(cart == null)
            {
                if(! await _cartRepository.CreateCart(userId)) return BadRequest("Cannot create cart");
                cart = await _cartRepository.GetAsync(userId);
            }
            return Ok(cart);

        }
        [HttpPost]
        public async Task<IActionResult> CreateCart()
        {
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");

            // Pass userId to repository
            if (!await _cartRepository.CreateCart(userId))
            {
                return BadRequest("Cannot create Cart, check if you already have one!");
            }

            return Ok("Cart created successfully!");
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveCart()
        {
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");

            // Pass userId to repository
            if (!await _cartRepository.DeleteCart(userId))
            {
                return BadRequest("Cannot remove Cart, maybe it's already removed");
            }

            return Ok("Cart removed successfully!");
        }
        
    }
}
