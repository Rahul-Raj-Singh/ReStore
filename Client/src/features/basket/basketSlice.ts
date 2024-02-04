import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

type BasketState = {
    basket: Basket | null,
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: "idle"
}

export const addItemToBasketAsync = createAsyncThunk<Basket, {productId: string, quantity: number}>(
    "basket/addItemToBasketAsync",
    async ({productId, quantity=1}, thunkApi) => {
        try 
        {
            const basket = agent.requests.post(`basket?productId=${productId}&quantity=${quantity}`, {});
            return basket;
        } 
        catch (error) 
        {
            return thunkApi.rejectWithValue({error});
        }
    }
);

export const removeItemFromBasketAsync = createAsyncThunk<void, {productId: string, quantity: number}>(
    "basket/removeItemFromBasketAsync",
    async ({productId, quantity=1}, thunkApi) => {
        try 
        {
            await agent.requests.delete(`basket?productId=${productId}&quantity=${quantity}`);
        } 
        catch (error) 
        {
            console.error(error);
            return thunkApi.rejectWithValue({error});
        }
    }
);

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        }
    },
    extraReducers: (builder) => {
        // addItemToBasketAsync
        builder.addCase(addItemToBasketAsync.pending, (state, action) => {
            state.status = "pendingAdd" + action.meta.arg.productId;
        });
        builder.addCase(addItemToBasketAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.basket = action.payload;
        });
        builder.addCase(addItemToBasketAsync.rejected, (state) => {
            state.status = "idle";
        });

        // removeItemFromBasketAsync
        builder.addCase(removeItemFromBasketAsync.pending, (state, action) => {
            state.status = "pendingRemove" + action.meta.arg.productId;
        });
        builder.addCase(removeItemFromBasketAsync.fulfilled, (state, action) => {
            state.status = "idle";

            const {productId, quantity} = action.meta.arg;

            if (!state.basket) return;
            
            const productIndex = state.basket.basketItems.findIndex(x => x.productId === productId);

            if (productIndex === -1) return;

            state.basket.basketItems[productIndex].quantity -= quantity!;
            
            if (state.basket.basketItems[productIndex].quantity == 0)
                state.basket.basketItems.splice(productIndex, 1);

        });
        builder.addCase(removeItemFromBasketAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        });


    }
});

export const {setBasket} = basketSlice.actions; 