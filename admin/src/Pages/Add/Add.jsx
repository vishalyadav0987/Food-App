import React, { useState } from 'react'
import {assets} from '../../assets/assets'
import './Add.css'

const Add = () => {
    const [image,setImage] = useState(false);
  return (
    <div className='add-container'>
        <div className="upload-img-container">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="product-name-container">
            <p>Product name</p>
            <input type="text" name="name" placeholder='product name'/>
        </div>
        <div className='product-description-container'>
            <p>Product description</p>
            <textarea name="description" id=""></textarea>
        </div>
        <div className="product-category-price-container">
            <div className="product-category-container">
                <p>Product category</p>
                <select name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="product-price-container">
                <p>Product price</p>
                <input type="text" name="price" placeholder='&#8377;20'/>
            </div>
        </div>
        <button className='add-btn'>ADD</button>
    </div>
  )
}

export default Add
