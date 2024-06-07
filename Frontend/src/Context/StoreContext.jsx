import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
// import { food_list } from '../assets/assets'; 1ST WE USE THIS API WHEN I MAKE FRONTEND DESIGN


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const url = "http://localhost:3000";
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    const addToCart = async(itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(`${url}/api/v1/cart/add`,{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(`${url}/api/v1/cart/remove`,{itemId},{headers:{token}});
        }
    }

    const getTotalCartAmount = () => {
        let TotalAmount = 0;
        for (const item in cartItem) {
            console.log(item);
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                TotalAmount += itemInfo.price * cartItem[item];
            }
        }
        return TotalAmount;
    }
    const fetchFoodListData = async()=>{
        const response = await axios.get(`${url}/api/v1/food/list`);
        setFood_list(response.data.data);
    }
    useEffect(()=>{
        async function loadData(){
            await fetchFoodListData();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         setToken(localStorage.getItem("token"));
    //     }
    // }, [])
    // useEffect(() => {
    //     console.log(cartItem)
    // }, [cartItem])
    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
