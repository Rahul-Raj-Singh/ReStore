import { BasketItem } from "./basketItem";

export type Basket = {
    basketId: string,
    buyerId: string,
    basketItems: BasketItem[]
};