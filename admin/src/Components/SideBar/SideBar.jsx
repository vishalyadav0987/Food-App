import React from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'

const SideBar = () => {
    return (

        <div className="sideBar">
            <div className="sideBar-container">
                <div className="sideBar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </div>
                <div className="sideBar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </div>
                <div className="sideBar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar
