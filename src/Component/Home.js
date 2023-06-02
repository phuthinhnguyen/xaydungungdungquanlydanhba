import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
function Home(){
    const [booklist, setBooklist] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        setTimeout(() => {
            axios.get("https://6478b80f362560649a2e5741.mockapi.io/books")
            .then(res=>setBooklist(res.data))
            .catch(err=>{throw err})
        }, 1000);
    },[booklist])

    function addBookClick(){
        navigate("/addbook",{state:booklist})
    }

    function delBook(id){
        setTimeout(() => {
            axios.delete(`https://6478b80f362560649a2e5741.mockapi.io/books/${id}`) 
        }, 1000);  
    }

    function editBook(item){
        navigate("/editbook",{state:item})
    }
    return(
        <>
            <div className="row">
                <h2 className="col-6 text-left">Library</h2>
                <button className="btn btn-success col-2" onClick={addBookClick}>Add a new book</button>
            </div>
            <h2>Add a new book</h2>
            <table className="table table-striped">
                <thead>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {booklist.map((item,index)=>
                    <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td><button className="btn btn-primary" onClick={()=>editBook(item)}>Edit</button><button className="btn btn-danger" onClick={()=>delBook(item.id)}>Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}
export default Home;