import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './FoodCard.css'
import { StoreContext } from '../../Context/StoreContext';

const FoodCard = ({ _id, category, description, image, name, price }) => {
    // const [itemCount, setItemCount] = useState(0);
    const { cartItem, setCartItem, addToCart, removeFromCart, } = useContext(StoreContext);
    return (
        <section className='food-card' style={{ color: "black" }}>
            <div className="card">
                <div className="card-img">
                    <img src={image} alt="" className='food-item-image' />
                    {/* {
                        !itemCount ?
                            (<img
                                onClick={() => setItemCount(prev => prev + 1)}
                                src={assets.add_icon_white} alt=""
                                className='add'
                            />)
                            : (<div className='food-item-counter'>
                                <img onClick={() => setItemCount(prev => prev - 1)} src={assets.remove_icon_red} alt="" />
                                <p>{itemCount}</p>
                                <img onClick={() => setItemCount(prev => prev + 1)} src={assets.add_icon_green} alt="" />
                            </div>)
                    } */}
                    {

                        !cartItem[_id] ?
                            (<img
                                onClick={() => addToCart(_id)}
                                src={assets.add_icon_white} alt=""
                                className='add'
                            />)
                            : (<div className='food-item-counter'>
                                <img onClick={() => removeFromCart(_id)} src={assets.remove_icon_red} alt="" />
                                <p>{cartItem[_id]}</p>
                                <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt="" />
                            </div>)
                    }
                </div>
                <div className="food-item-info">
                    <div className="food-item-rating-name flex space-between align-center">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="desc">{description}</p>
                    <p className="food-item-price">&#8377;{price}</p>
                </div>
            </div>
        </section>
    )
}

export default FoodCard
