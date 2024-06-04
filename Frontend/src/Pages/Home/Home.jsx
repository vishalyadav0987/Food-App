import React, { useState } from 'react'
import Hero from '../../Components/Hero/Hero'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'

const Home = () => {
    const [category, setCategory] = useState("All");
    
    return (
        <>
            <div className="app">
                <Hero />
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} />
            </div>
        </>
    )
}

export default Home
