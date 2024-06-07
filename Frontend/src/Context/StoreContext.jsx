import { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const url = "http://localhost:3000"

    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getTotalCartAmount = ()=>{
        let TotalAmount =0;
        for(const item in cartItem){
            console.log(item);
            if(cartItem[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                TotalAmount+=itemInfo.price * cartItem[item];
            }
        }
        return TotalAmount;
    }
    useEffect(() => {
        console.log(cartItem)
    }, [cartItem])
    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
