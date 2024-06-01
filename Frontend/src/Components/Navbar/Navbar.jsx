import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
    const [navLinkLine, setNavLinkLine] = useState("home");
    return (
        <>
            <section className="navbar center">
                <header className='flex align-center space-between'>
                    <div className="brand-logo">
                        <img src={assets.logo} alt="" className="logo" />
                    </div>
                    <ul className="nav-links flex align-center">
                        <li className={`${navLinkLine === "home" ? "active" : ""}`} onClick={() => setNavLinkLine("home")}>
                            Home
                        </li>
                        <li className={`${navLinkLine === "menu" ? "active" : ""}`} onClick={() => setNavLinkLine("menu")}>
                            Menu
                        </li>
                        <li className={`${navLinkLine === "mobile-app" ? "active" : ""}`}
                            onClick={() => setNavLinkLine("mobile-app")}>
                            Mobile app
                        </li>
                        <li className={`${navLinkLine === "contact" ? "active" : ""}`} onClick={() => setNavLinkLine("contact")}>
                            Contact us
                        </li>
                    </ul>
                    <div className="icon-container flex align-center">
                        <FaRegHeart />
                        <div className="basket-icon">
                            <FaShoppingBag />
                            <div className="dot"></div>
                        </div>
                        <button className='register btn'>sign in</button>
                    </div>
                </header>
            </section>
        </>
    )
}

export default Navbar
