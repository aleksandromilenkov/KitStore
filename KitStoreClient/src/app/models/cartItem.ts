import { Kit } from "./kit";

export type CartItem = {
    id: number;
    cartId: number;
    kitId: number;
    kit: Kit;
    quantity: number;
  }
  