import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodCard from '../FoodCard/FoodCard'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)

    return (
        <>
            <section id="food-display">
                <div className='divider'></div>
                <div className="food-card-container">
                    <h1 className='top-heading'>Top dishes near you</h1>
                    <div className="cards">
                        {
                            food_list.map((item, index) => {
                                // console.log(item)
                                console.log(category)
                                {console.log(category,item.category)}
                                if(category==="All"||category===item.category){
                                    return  <FoodCard key={index}
                                            _id={item._id}
                                            price={item.price}
                                            description={item.description}
                                            image={item.image}
                                            name={item.name}
                                        />
                                    
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default FoodDisplay
