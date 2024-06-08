import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css';
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets'

const MyOrder = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchMyOrders = async () => {
        const response = await axios.post(`${url}/api/v1/order/userorders`, {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    }
    useEffect(() => {
        if (token) {
            fetchMyOrders();
        }
    }, [token])
    return (
        <div className='my-orders'>
            <div className="container">
                {
                    data.map((order, index) => {
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item,index)=>{
                                    if(index === order.items.length - 1){
                                        return `${item.name} x ${item.quantity}`
                                    }
                                    else{
                                        return `${item.name} x ${item.quantity}, `
                                    }
                                })}</p>
                                <p>&#8377;{order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span 
                                style={{color:`${order.status==="Delivered"?"#1ca26f":"tomato"}`}}
                                >&#x25cf;</span><b> {order.status}</b></p>
                                <button onClick={fetchMyOrders}>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrder
