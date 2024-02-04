import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "../../features/basket/basketSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { catalogSlice } from "../../features/catalog/catalogSlice";

export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;