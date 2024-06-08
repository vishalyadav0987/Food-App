import React from 'react'
import './index.css'
import Navbar from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from "./Pages/ListGetallfood/List"
import Order from './Pages/Orders/Order'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      {/* <hr /> */}
      <div className="app-component">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Order />} />
        </Routes>
      </div>
    </>
  )
}

export default App
