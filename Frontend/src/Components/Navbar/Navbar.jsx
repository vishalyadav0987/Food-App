import React, { useState,useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
    const [navLinkLine, setNavLinkLine] = useState("home");
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (
        <>
            <section className={`navbar ${scrolled ? 'scrolled' : ''} center`} >
                <header className='flex align-center space-between'>
                    <div className="brand-logo">
                        <Link to={'/'}>
                        <img src={assets.logo} alt="" className="logo" />
                        </Link>
                    </div>
                    <ul className="nav-links flex align-center">
                        <Link to="/">
                            <li className={`${navLinkLine === "home" ? "active" : ""}`} onClick={() => setNavLinkLine("home")}>
                                Home
                            </li>
                        </Link>
                        <a href="#ExploreMenu">
                            <li className={`${navLinkLine === "menu" ? "active" : ""}`} onClick={() => setNavLinkLine("menu")}>
                                Menu
                            </li>
                        </a>
                        <a href="#">
                            <li className={`${navLinkLine === "mobile-app" ? "active" : ""}`}
                                onClick={() => setNavLinkLine("mobile-app")}>
                                Mobile app
                            </li>
                        </a>
                        <a href="#footer">
                            <li
                                className={`${navLinkLine === "contact" ? "active" : ""}`}
                                onClick={() => setNavLinkLine("contact")}
                            >
                                Contact us
                            </li>
                        </a>
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
