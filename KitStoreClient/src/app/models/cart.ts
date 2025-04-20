import { CartItem } from "./cartItem"
import { User } from "./user";

export type Cart = {
    id: number,
    createdDate: Date;
    updatedDate: Date;
    userId: string;
    user: User;
    items: CartItem[],
    clientSecret?: string,
    paymentIntentId?: string,
    coupon?: Coupon
}

export type Coupon = {
    couponId: number,
    name: string,
    amountOff?: number,
    percentOff?:number,
    promotionCode: number
}
