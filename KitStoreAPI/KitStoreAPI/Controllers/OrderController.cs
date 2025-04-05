using System.Security.Claims;
using API.Services;
using AutoMapper;
using KitStoreAPI.DTOs;
using KitStoreAPI.Entities.OrderEntityAggregate;
using KitStoreAPI.Extentions;
using KitStoreAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController(IOrderRepository _orderRepository, ICartRepository _cartRepository, IOrderItemRepository _orderItemRepository, DiscountService discountService, IMapper _mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            var orders = await _orderRepository.GetOrders(User.GetUserName());
            var ordersDTos = _mapper.Map<List<OrderDTO>>(orders);
            return ordersDTos;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] CreateOrderDTO createOrderDto)
        {
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");
            var cart = await _cartRepository.GetAsync(userId);
            if (cart == null || cart.Items.Count == 0 || string.IsNullOrEmpty(cart.PaymentIntentId))
                return BadRequest("Cart is empty or not found");
            var items = await _orderItemRepository.CreateOrderItems(cart.Items);
            if (items == null) return BadRequest("Some items out of stock");
            var subtotal = items.Sum(i => i.Price * i.Quantity);
            var discount = cart.AppCoupon != null
                ? subtotal - discountService.CalculateDiscountFromAmount(cart.AppCoupon, subtotal)
                : 0;
            var deliveryFee = CalculateDeliveryFee(subtotal);
            var order = await _orderRepository.GetOrderByPaymentIntentId(cart);
            if (order == null)
            {
                order = new Order()
                {
                    BuyerEmail = User.GetUserName(),
                    OrderItems = items,
                    ShippingAddress = createOrderDto.ShippingAddress,
                    PaymentSummary = createOrderDto.PaymentSummary,
                    Subtotal = subtotal,
                    DeliveryFee = deliveryFee,
                    Discount = (long)discount,
                    PaymentIntentId = cart.PaymentIntentId,
                };
                var result = await _orderRepository.CreateOrder(order);
                if (result)
                {
                    return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, _mapper.Map<OrderDTO>(order));
                }
                else
                {
                    return BadRequest("Cannot create order");
                }
            }
            else
            {
                order.OrderItems = items;
                return await _orderRepository.SaveChanges() ? CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, _mapper.Map<OrderDTO>(order)) : BadRequest("Cannot create order");

            }
        }

        [HttpGet("id:int")]
        public async Task<ActionResult<OrderDTO>> GetOrderDetails(int id)
        {
            var order = await _orderRepository.GetOrderByIdAndEmail(id ,User.GetUserName());
            if (order == null) return NotFound();
            var orderDto = _mapper.Map<OrderDTO>(order);
            return orderDto;
        }

        private long CalculateDeliveryFee(long subtotal)
        {
            return subtotal > 1000 ? 0 : 50;
        }
    }
}
