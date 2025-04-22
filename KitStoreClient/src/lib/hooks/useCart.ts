import { useClearCartMutation, useFetchCartQuery } from "../../features/cart/cartApi";

export const useCart = () => {
      const { data: cart, isLoading: isLoadingCart } = useFetchCartQuery();
      const [clearCart] = useClearCartMutation();
      const cartCoupon = cart?.coupon;
      const subtotal = cart?.items?.reduce((acc, val) => acc + val.kit.price * val.quantity, 0) ?? 0;
      const deliveryFee = subtotal / 100 > 100 ? 0 : 500;
      const discount = cart?.coupon?.percentOff
            ? Math.round((subtotal * (cart.coupon.percentOff / 100)) * 100) / 100
            : cart?.coupon?.amountOff
                  ? cart.coupon.amountOff
                  : 0;
      const total = subtotal + deliveryFee - discount;
      return {cart, isLoadingCart, subtotal, deliveryFee, discount, total, cartCoupon, clearCart};
}