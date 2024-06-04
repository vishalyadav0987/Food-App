import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login/Login'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <BrowserRouter>
      {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
      <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;