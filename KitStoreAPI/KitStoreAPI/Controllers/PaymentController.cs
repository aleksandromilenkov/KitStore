using System.Security.Claims;
using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Entities.OrderEntityAggregate;
using KitStoreAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestoreAPI.Services;
using Stripe;

namespace KitStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController(PaymentsService paymentsService, ICartRepository _cartRepository, IKitRepository _kitRepository, StoreContext storeContext, ILogger<PaymentController> logger, IConfiguration config, IOrderRepository _orderRepository) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Cart>> CreateOrUpdateIntent()
        {
            if (User.Identity?.IsAuthenticated == false) return BadRequest();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return BadRequest("User ID not found in token.");
            var cart = await _cartRepository.GetAsync(userId);
            if (cart == null) return BadRequest("Problem with retreiving the cart");
            var intent = await paymentsService.CreateOrUpdatePaymentIntent(cart);
            if (intent == null) return BadRequest("Problem creating payment intent");
            cart.PaymentIntentId ??= intent.Id;
            cart.ClientSecret ??= intent.ClientSecret;
            if (storeContext.ChangeTracker.HasChanges())
            {
                var result = await _cartRepository.UpdateCart(cart);
                if (!result) return BadRequest("Problem updating cart with intent");
            }
            return cart;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = ConstructStripeEvent(json);
                if (stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    return BadRequest("Invalid event data");
                }
                if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
                else await HandlePaymentIntentFailed(intent);
                return Ok();
            }
            catch (StripeException e)
            {
                logger.LogError(e, "Stripe webhook error");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
            }
            catch (Exception e)
            {
                logger.LogError(e, "Unexpected error has occurred");
                return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error");
            }
        }

        private async Task HandlePaymentIntentFailed(PaymentIntent intent)
        {
            var order = await _orderRepository.GetOrderByPaymentIntentId(intent.Id) ?? throw new Exception("Order not found");
            foreach (var item in order.OrderItems)
            {
                var productItem = await _kitRepository.GetAsync(item.ItemOrdered.ProductId) ?? throw new Exception("Problem updating Order stock");
                productItem.QuantityInStock += item.Quantity;
            }
            order.OrderStatus = OrderStatus.PaymentFailed;
            await _orderRepository.UpdateOrder(order);
        }

        private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            var order = await _orderRepository.GetOrderByPaymentIntentId(intent.Id) ?? throw new Exception("Order not found");
            if (intent.Amount != (order.Subtotal + order.DeliveryFee - order.Discount))
            {
                order.OrderStatus = OrderStatus.PaymentMismatch; // for trying to 'hack' the system
            }
            else
            {
                order.OrderStatus = OrderStatus.PaymentReceived;
            }
            var cart = await _cartRepository.GetCartByIntentId(intent.Id);
            if (cart != null)
            {
                await _cartRepository.DeleteCartByCart(cart);
            }
            await _orderRepository.UpdateOrder(order);
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], config["StripeSettings:WhSecret"]);

            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to construct stripe event");
                throw new StripeException("Invalid signature");
            }
        }
    }
}
