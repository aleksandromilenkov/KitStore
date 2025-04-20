using System.Security.Claims;
using API.Services;
using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Services;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController(ICartRepository _cartRepository, DiscountService discountService, PaymentsService paymentsService) : ControllerBase
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

        [HttpPost("{code}")]
        public async Task<ActionResult<Cart>> AddCouponCode(string code)
        {
            // get the cart and check to ensure it has the client secret
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");
            var cart = await _cartRepository.GetAsync(userId);
            if (cart == null || cart.ClientSecret == null) { return BadRequest(); }
            var cartReturn = await _cartRepository.AddCoupon(code, cart);
            if (cartReturn == null)
            {
                return BadRequest("Invalid coupon code");
            }
            else return cartReturn;
        }

        [HttpDelete("remove-coupon")]
        public async Task<IActionResult> RemoveCouponFromCart()
        {
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");
            var cart = await _cartRepository.GetAsync(userId);
            if (cart == null || cart.ClientSecret == null) { return BadRequest(); }
            return await _cartRepository.RemoveCoupon(cart) ? Ok() : BadRequest();
        }
    }
}
