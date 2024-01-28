import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket"

type StoreContextValue = {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: string, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
    const value = useContext(StoreContext);

    if (!value) throw Error("Oops - we seem to be outside of context provider!");

    return value;
} 


export default function StoreProvider({children}: PropsWithChildren<unknown>) {

    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: string, quantity: number)
    {
        const items = [...basket!.basketItems];
        const itemIndex = items.findIndex(x => x.productId == productId);

        if(itemIndex == -1) return;

        items[itemIndex].quantity -= quantity;

        if (items[itemIndex].quantity == 0) items.splice(itemIndex, 1);

        setBasket(prevState => ({...prevState!, basketItems: items}));
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )

}