import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
function Editbook(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const [valueinput,setValueinput] = useState(state);

    function savebook(e){
        e.preventDefault();
        axios.put(`https://6478b80f362560649a2e5741.mockapi.io/books/${state.id}`,{
            title:valueinput.title,
            quantity:valueinput.quantity
        })
        .then(res=>{alert(res.status); navigate("/")})
    }
    
    function handleChange(e){
        setValueinput({...valueinput,[e.target.name]:e.target.value})
        console.log(valueinput)
    }
    return(
        <form onSubmit={(e)=>savebook(e)}>
            <label>Title</label><br></br>
            <input value={valueinput.title} onChange={(e)=>handleChange(e)} name="title"></input><br></br>
            <label>Quantity</label><br></br>
            <input type="number" value={valueinput.quantity} onChange={(e)=>handleChange(e)} name="quantity"></input><br></br>
            <button className="btn btn-success mt-2" type="submit">Save</button>
        </form> 
    )
}
export default Editbook;