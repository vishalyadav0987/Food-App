import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Add = () => {
    const url = 'http://localhost:3000';
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/v1/food/add`, formData);
        console.log(response, response.data);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            });
            setImage(false);
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
    }
    return (

        <form onSubmit={onSubmitHandler} className='add-container'>
            <div className="upload-img-container">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="product-name-container">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='product name' required />
            </div>
            <div className='product-description-container'>
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" id="" required></textarea>
            </div>
            <div className="product-category-price-container">
                <div className="product-category-container">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" required>
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
                    <input onChange={onChangeHandler} value={data.price} type="text" name="price" placeholder='&#8377;20' required />
                </div>
            </div>
            <button className='add-btn'>ADD</button>
        </form>

    )
}

export default Add
