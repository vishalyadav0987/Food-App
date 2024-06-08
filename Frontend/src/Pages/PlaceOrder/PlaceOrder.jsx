import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, url, food_list,cartItem } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }
  // useEffect(()=>{
  //   console.log(data)
  // },[data]);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      // woh wale item jiski id cart me present id se match karti hai isliye hai ye condition
      if(cartItem[item._id]>0){
        // item means pura ek object hai
        let itemInfo = item;
        itemInfo["quantity"]=cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+50,
    }
    let response = await axios.post(`${url}/api/v1/order/place`,orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      toast.success("Payment succesfully paid!");
      window.location.replace(session_url);
    }
    else{
      toast.error('Something went wrong,try again later!');
    }
  }

  return (
    <section className="place-order-container">
      <form className='place-order' onSubmit={placeOrderHandler}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required 
              name='firstName'
              onChange={onChangeHandle}
              value={data.firstName}
              type="text"
              placeholder='First name'
            />
            <input required
              name='lastName'
              onChange={onChangeHandle}
              value={data.lastName}
              type="text"
              placeholder='Last name'
            />
          </div>
          <input required
            name='email'
            onChange={onChangeHandle}
            value={data.email}
            type="email"
            placeholder='Email address'
          />
          <input required
            name='street'
            onChange={onChangeHandle}
            value={data.street}
            type="text"
            placeholder='street'
          />
          <div className="multi-fields">
            <input required
              name='zipcode'
              onChange={onChangeHandle}
              value={data.zipcode}
              type="text"
              placeholder='Zip code'
            />
            <input required
              name='country'
              onChange={onChangeHandle}
              value={data.country}
              type="text"
              placeholder='Country'
            />
          </div>
          <input required
            name='phone'
            onChange={onChangeHandle}
            value={data.phone}
            type="phone"
            placeholder='Phone'
          />
        </div>
        <div className="place-order-right">
          <div className='cart-total-details'>
            <h2>Cart Subtotal</h2>
            <div className="cart-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr style={{ background: "rgba(128, 128, 128, 0.1)" }} />
            <div className="cart-details">
              <p>Delvery Charges</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr style={{ background: "rgba(128, 128, 128, 0.1)" }} />
            <div className="cart-details">
              <b>Toatal</b>
              <b>&#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
            <button onClick={() => navigate('/order')} type='submit'>proceed to payment</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default PlaceOrder