import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import Footer from '../../Components/Footer/Footer'
import Login from '../Login/Login'

const Home = () => {
    const [category, setCategory] = useState("All");
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
            <div className="app">
                <Navbar setShowLogin={setShowLogin} />
                <Hero />
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} />
                <Footer />
            </div>
        </>
    )
}

export default Home
