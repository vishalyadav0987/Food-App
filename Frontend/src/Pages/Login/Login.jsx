import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Login.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import {toast} from 'react-hot-toast'

const Login = ({ setShowLogin }) => {
  const [currState, setCurState] = useState("Login");
  const { url,token,setToken } = useContext(StoreContext)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if(currState==="Login"){
      newUrl+='/api/v1/user/login';
    }
    else{
      newUrl+='/api/v1/user/register';
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      toast.success(response.data.message);
      setShowLogin(false);
    }
    else{
      toast.error(response.data.message);
    }
  }
  return (
    <>
      <div className="login-register-container">
        <form className="form-container" onSubmit={onSubmitHandler}>
          <div className="login-text">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="form-controls">
            {currState === "Login" ? "" : <input
              onChange={onChangeHandler}
              type="text"
              placeholder='your name'
              name='name'
              required
              value={data.name}
            />}
            <input
              onChange={onChangeHandler}
              type="email"
              name='email'
              required
              placeholder='Enter email '
              value={data.email}
            />
            <input
              onChange={onChangeHandler}
              type="password"
              name='password'
              required
              placeholder='Password'
              value={data.password}
            />
          </div>
          <button type='submit'>{currState === "Register" ? "Create account" : "Login"}</button>
          <div className="terms-condition">
            <input type="checkbox" required />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, alias.</p>
          </div>
          {
            currState === "Login"
              ? <p>Create a new account? <span onClick={() => setCurState("Register")}>Click here</span></p>
              : <p>Already have an account? <span onClick={() => setCurState("Login")}>Click here</span></p>
          }

        </form>
      </div>
    </>
  )
}

export default Login
