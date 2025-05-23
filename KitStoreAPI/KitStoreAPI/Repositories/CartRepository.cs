﻿using API.Services;
using KitStoreAPI.Data;
using KitStoreAPI.Entities;
using KitStoreAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using RestoreAPI.Services;

namespace KitStoreAPI.Repositories
{
    public class CartRepository(StoreContext _context, DiscountService discountService, PaymentsService paymentsService) : ICartRepository
    {
        public async Task<Cart?> AddCoupon(string code, Cart cart)
        {
            var coupon = await discountService.GetCouponFromPromoCode(code);
            cart.AppCoupon = coupon;
            await paymentsService.CreateOrUpdatePaymentIntent(cart);
            var changes = await _context.SaveChangesAsync() > 0;
            return changes ? cart : null;
        }

        public async Task<bool> CreateCart(string userId)
        {
            var existingCart = await _context.Carts.FirstOrDefaultAsync(c=> c.UserId == userId);
            if(existingCart != null) { return false; }
            _context.Add(new Cart() { UserId = userId });
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteCart(string userId)
        {
            var cartToRemove = await _context.Carts.FirstOrDefaultAsync(c=>c.UserId == userId);
            if (cartToRemove == null) return false;
            var cartItemsToRemove = await _context.CartItems.Where(ci => ci.CartId == cartToRemove.Id).ToListAsync();
            if (cartItemsToRemove.Any())
            {
                _context.CartItems.RemoveRange(cartItemsToRemove);
            }
            _context.Remove(cartToRemove);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteCartByCart(Cart cart)
        {
            var cartToRemove = await _context.Carts.FindAsync(cart.Id);
            if (cartToRemove == null) return false;
            _context.Remove(cartToRemove);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Cart?> GetAsync(string userId)
        {
            var cart = await _context.Carts.Include(c=> c.Items).ThenInclude(i=>i.Kit).ThenInclude(k=> k.Club).FirstOrDefaultAsync(c=> c.UserId == userId);
            return cart;
        }

        public async Task<Cart?> GetCartByIntentId(string intentId)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.PaymentIntentId == intentId);
            return cart;
        }

        public async Task<bool> RemoveCoupon(Cart cart)
        {
            await paymentsService.CreateOrUpdatePaymentIntent(cart);
            cart.AppCoupon = null;
            var changes = await _context.SaveChangesAsync() > 0;
            return changes;
        }

        public async Task<bool> UpdateCart(Cart cart)
        {
            _context.Carts.Update(cart);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
