import React from 'react'
import { useEffect } from 'react'
import { useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Books = () => {
const [Books, setBooks] = useState([])

useEffect(() => {
    const fecthAllBooks = async () => {
        try{
            const res = await axios.get("http://localhost:8800/Books")
            setBooks(res.data);
        }catch(err){
            console.log(err);
        }
    };
    fecthAllBooks();
    },[]);

const handleDelete = async (id) => {
    try{
        await axios.delete("http://localhost:8800/Books/"+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
}

    return(
        <div>
            <h1>My Book Shop</h1>
            <div className="Books">
                {Books.map(Book=>(
                    <div className="Book" id={Book.id}>
                        {Book.cover && <img src={Book.cover} alt="" />}
                        <h2>{Book.title}</h2>
                        <p>{Book.desc}</p>
                        <span>{Book.price}</span>
                        <button className="delete" onClick={() => handleDelete(Book.id)}>Delete</button>
                        <button className="update"><Link to={`/Update/${Book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to="/Add">Add new book</Link></button>
        </div>
    );
};

export default Books;