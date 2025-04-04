using API.Services;
using KitStoreAPI.Entities;
using Stripe;

namespace RestoreAPI.Services
{
    public class PaymentsService(IConfiguration config, API.Services.DiscountService discountService)
    {
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Cart cart)
        {
            StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            var subtotal = cart.Items.Sum(i => i.Quantity * i.Kit.Price);
            var deliveryFee = subtotal > 1000 ? 0 : 50;
            double discount = 0;
            if (cart.AppCoupon != null) {
                discount = discountService.CalculateDiscountFromAmount(cart.AppCoupon, subtotal);
            }
            var totalAmount = subtotal + deliveryFee - discount;
            if (string.IsNullOrEmpty(cart.PaymentIntentId)) {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long?)totalAmount,
                    Currency = "usd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await service.CreateAsync(options);
            } else {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long?)totalAmount,
                };
                await service.UpdateAsync(cart.PaymentIntentId, options);
            }
            return intent;
        }
    }
}
