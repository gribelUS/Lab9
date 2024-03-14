import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Update = () => {
    const [Book, setBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:"",
    });

    const navigate = useNavigate()
    const location = useLocation()
    
    const BookId = location.pathname.split("/")[2]

    console.log(location.pathname.split("/")[2])

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value }))
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/Books/" + BookId, Book)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    };
    console.log(Book)
    return(
        <div className='form'>
            <h1>Update book information</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title"/>
            <input type="text" placeholder='desc' onChange={handleChange} name="desc" />
            <input type="number" placeholder='price' onChange={handleChange} name="price" />
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    )
};

export default Update;