import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import {assets} from '../../assets/assets'

const List = () => {
  const url = 'http://localhost:3000'
  const [list, setList] = useState([]);
  const fetchFoodData = async () => {
    const response = await axios.get(`${url}/api/v1/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }
  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/v1/food/remove`,{id:foodId});
    await fetchFoodData();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    fetchFoodData();
  }, []);
  // console.log(list);
  return (
    <>
      <section className='cart-container'>
        <p className='heading'>All Food List</p>
        <div className="container">
          <div className="cart-header">
            <span><b>Image</b></span>
            <span><b>Name</b></span>
            <span><b>Category</b></span>
            <span><b>Price</b></span>
            <span><b>Action</b></span>
          </div>
          <hr />
          {
            list.map((item, index) => {
              return (
                <>
                  <div key={item._id}>
                    <div className="cart-item cart-header" >
                      <img src={`${url}/images/${item.image}`} alt="" />
                      <span>{item.name}</span>
                      <span>{item.category}</span>
                      <span>&#8377;{item.price}</span>
                      <img 
                      src={assets.cross_icon} 
                      alt="" onClick={() => removeFood(item._id)}
                      style={{marginLeft:"10px"}} />
                    </div>
                    <hr />
                  </div>
                </>
              )

            })
          }
        </div>
      </section>
    </>
  )
}

export default List
