import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login/Login'
import { Toaster } from 'react-hot-toast'
import Verify from './Pages/Verify/Verify'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <BrowserRouter>
        {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
        <Toaster />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;