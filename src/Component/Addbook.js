import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Addbook(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const [booklist, setBooklist] = useState(state);
    
    function addbook(e){
        e.preventDefault();
        axios.post("https://6478b80f362560649a2e5741.mockapi.io/books",{
        title:document.getElementById("title").value,
        quantity:document.getElementById("quantity").value
        })
        .then(res=>{setBooklist([...booklist,res.data]);alert(res.status);navigate("/")})
        .catch(err=>{console.log(err)})
    }
    return(
        <form onSubmit={(e)=>addbook(e)}>
            <label>Title</label><br></br>
            <input id="title"></input><br></br>
            <label>Quantity</label><br></br>
            <input id="quantity" type="number"></input><br></br>
            <button className="btn btn-success mt-2" type="submit">Add</button>
        </form> 
    )
}
export default Addbook;