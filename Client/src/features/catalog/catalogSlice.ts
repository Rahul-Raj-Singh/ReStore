import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/store";

const productsAdapter = createEntityAdapter({
    selectId: (p: Product) => p.productId
});

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    "catalog/fetchProductsAsync",
    async (_, thunkApi) => {
        try {
            const products = await agent.requests.get("product");
            return products;
        } catch (error) {
            console.error(error);
            return thunkApi.rejectWithValue({error});
        }
    }
);

export const fetchSingleProductAsync = createAsyncThunk<Product, string>(
    "catalog/fetchSingleProductAsync",
    async (productId: string, thunkApi) => {
        try {
            const product = await agent.requests.get(`product/${productId}`);

            if (!product) return thunkApi.rejectWithValue({error: "No product received from API"});

            return product;
        } catch (error) {
            return thunkApi.rejectWithValue({error});
        }
    }
);

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState({
        status: "idle",
        productsCached: false
    }),
    reducers: {},
    extraReducers: builder => {
        // fetchProductsAsync
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.productsCached = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        });

        // fetchSingleProductAsync
        builder.addCase(fetchSingleProductAsync.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });
        builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        });
    }
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);