using AutoMapper;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartItemController(ICartItemRepository _cartItemRepository, IKitRepository _kitRepository, IMapper _mapper) : ControllerBase
    {

        [HttpGet("{id}")]
        public async Task<ActionResult<CartItemDTO>> GetCartItem([FromRoute] int id)
        {
            var cartItem = await _cartItemRepository.GetAsync(id);
            if (cartItem == null) return NotFound("Not found");
            var cartItemDTO = _mapper.Map<CartItemDTO>(cartItem);
            return Ok(cartItemDTO);
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToCart([FromBody] CreateCartItemDTO createCartItemDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if(createCartItemDTO.Quantity <= 0) return BadRequest("Cannot have null or negative quantity");
            if (await _kitRepository.GetAsyncAsNoTracking(createCartItemDTO.KitId) == null) return BadRequest("No Kit provided");
            var cartItem = _mapper.Map<CartItem>(createCartItemDTO);
            if (!await _cartItemRepository.CreateCartItem(cartItem))
            {
                return BadRequest("Cannot add this cart item");
            }
            var cartItemDTO = _mapper.Map<CartItemDTO>(cartItem);
            return CreatedAtAction(nameof(GetCartItem), new { id = cartItem.Id }, cartItemDTO);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCartItem([FromBody] UpdateCartItemDTO updateCartItemDTO)
        {
            if (updateCartItemDTO.Id <= 0) return BadRequest("Invalid Cart Item ID");

            var itemToUpdate = await _cartItemRepository.GetAsync(updateCartItemDTO.Id);
            if (itemToUpdate == null) return NotFound("Cart Item not found");

            // Use AutoMapper to update only the changed properties
            _mapper.Map(updateCartItemDTO, itemToUpdate);

            if (!await _cartItemRepository.UpdateCartItem(itemToUpdate))
                return BadRequest("Cannot update this item");

            return NoContent();
        }


        [HttpDelete("{itemId}")]
        public async Task<IActionResult> RemoveItemFromCart([FromRoute] int itemId)
        {
            if (itemId <= 0) return BadRequest();
            var itemToRemove = await _cartItemRepository.GetAsync(itemId);
            if (itemToRemove == null) return BadRequest("Item is already removed");
            if (!await _cartItemRepository.DeleteCartItem(itemToRemove)) return BadRequest("Cannot remove this item");
            return NoContent();
        }
    }
}
