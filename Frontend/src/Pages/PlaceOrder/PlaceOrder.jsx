import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css'

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <section className="place-order-container">
      <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='street' />
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
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
            <p>&#8377;{getTotalCartAmount()===0?0:50}</p>
          </div>
          <hr style={{ background: "rgba(128, 128, 128, 0.1)" }} />
          <div className="cart-details">
            <b>Toatal</b>
            <b>&#8377;{getTotalCartAmount() === 0 ? 0: getTotalCartAmount() + 50 }</b>
          </div>
          <button onClick={() => navigate('/order')}>proceed to payment</button>
        </div>
      </div>
    </form>
    </section>
  )
}

export default PlaceOrder