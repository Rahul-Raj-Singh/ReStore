import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

type BasketState = {
    basket: Basket | null
}

const initialState: BasketState = {
    basket: null
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;

            if (!state.basket) return;
            
            const productIndex = state.basket.basketItems.findIndex(x => x.productId === productId);

            if (productIndex === -1) return;

            state.basket.basketItems[productIndex].quantity -= quantity;
            
            if (state.basket.basketItems[productIndex].quantity == 0)
                state.basket.basketItems.splice(productIndex, 1);
        }
    }
});

export const {setBasket, removeItem} = basketSlice.actions; 