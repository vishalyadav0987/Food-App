import React, { useState,useEffect, useContext, Profiler } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { StoreContext } from '../../Context/StoreContext';
import { FaUser } from "react-icons/fa";

const Navbar = ({setShowLogin}) => {
    const [navLinkLine, setNavLinkLine] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if(window.scrollY===0){
        setNavLinkLine("home");
        // navigate('/');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
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
                            <Link to={'/cart'}><FaShoppingBag /></Link>
                            <div className={getTotalCartAmount()===0?"":"dot"}></div>
                        </div>
                        {
                            !token
                            ? <button className='register btn' onClick={()=>setShowLogin(true)}>sign in</button>
                            : <div className='navbar-profile'>
                                <FaUser />
                                <ul className='nav-profile-dropdown'>
                                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                                </ul>
                            </div>
                        }
                    </div>
                </header>
            </section>
        </>
    )
}

export default Navbar
