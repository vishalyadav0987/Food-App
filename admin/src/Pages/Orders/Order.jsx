import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { assets } from '../../assets/assets'
import './Order.css'

const Order = () => {
  const url = "http://localhost:3000"
  const [orders, setOrders] = useState([]);
  const fetchAllOrder = async () => {
    const response = await axios.get(`${url}/api/v1/order/list`);
    if (response.data.success) {
      setOrders(response?.data?.data);
    }
    else {
      toast.error("Something went wrong,try again later!!");
    }
  }
  const updateOrderStatusHandler = async (e, orderId) => {
    const response = await axios.post(`${url}/api/v1/order/status`, {
      orderId,
      status: e.target.value
    });
    if(response.data.success){
      toast.success(response.data.message);
      await fetchAllOrder();
    }
  }
  useEffect(() => {
    fetchAllOrder();
  }, [])
  console.log(orders)
  return (
    <div className='orders add'>
      <p className='heading'>Order Page</p>
      <div className="order-list">
        {
          orders.map((order, index) => {
            return (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {
                      order.items.map((item) => {
                        if (index === order.items.length - 1) {
                          return `${item.name} x ${item.quantity}`
                        }
                        else {
                          return `${item.name} x ${item.quantity}, `
                        }
                      })
                    }
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street + ", "}</p>
                    <p>
                      {
                        `${order.address.city} ${order.address.state} ${order.address.country}, ${order.address.zipcode}`
                      }
                    </p>
                  </div>
                  <p className="order item phone">{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>&#8377;{order.amount}</p>
                <select name="" id=""
                  onChange={(e) => updateOrderStatusHandler(e, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order
