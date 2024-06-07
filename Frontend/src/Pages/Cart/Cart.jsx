import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { food_list, removeFromCart, cartItem, getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <section className='cart-container'>
      <div className="container">
        <div className="cart-header">
          <span>Item</span>
          <span>Title</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Remove</span>
        </div>
        <div className="divider"></div>
        {
          food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <>
                  <div key={item._id}>
                    <div className="cart-item cart-header" >
                      <img src={`${url}/images/${item.image}`} alt="" />
                      <span>{item.name}</span>
                      <span>&#8377;{item.price}</span>
                      <span>{cartItem[item._id]}</span>
                      <span>&#8377;{cartItem[item._id] * item.price}</span>
                      <img src={assets.cross_icon} alt="" onClick={() => removeFromCart(item._id)} />
                    </div>
                    <hr style={{ background: "rgba(128, 128, 128, 0.1)" }} />
                  </div>
                </>
              )
            }
          })
        }
        <div className="cart-bottom">
          <div className="cart-total">
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
              <button
                onClick={() => navigate(getTotalCartAmount() === 0
                  ? '/'
                  : '/order'
                )}>proceed to checkout</button>
            </div>
            <div className="cart-promoCode">
              <div>
                <p>If you have a prome code, Enter it there</p>
                <div className="cart-promo-input">
                  <input type="text" name="" id="" placeholder='Enter promo code' />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
