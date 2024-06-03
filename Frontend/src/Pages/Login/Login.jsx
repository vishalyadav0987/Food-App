import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Login.css'

const Login = ({ setShowLogin }) => {
  const [currState, setCurState] = useState("Login")
  return (
    <>
      <div className="login-register-container">
        <form className="form-container">
          <div className="login-text">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="form-controls">
            {currState === "Login" ? "" : <input type="text" placeholder='your name' name='name' required />}
            <input type="email" name='email' required placeholder='Enter email ' />
            <input type="password" name='password' required placeholder='Password' />
          </div>
          <button>{currState === "Register" ? "Create account" : "Login"}</button>
          <div className="terms-condition">
            <input type="checkbox" required />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, alias.</p>
          </div>
          {
            currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurState("Register")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurState("Login")}>Click here</span></p>
          }
          
        </form>
      </div>
    </>
  )
}

export default Login
