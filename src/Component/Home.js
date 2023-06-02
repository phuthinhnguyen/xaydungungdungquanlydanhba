import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
function Home(){
    const [contactlist, setContactlist] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
      axios.get("https://64785a42362560649a2d982e.mockapi.io/contacts")
      .then(res=>setContactlist(res.data))
      .catch(err=>{console.log(err)})
    },[contactlist])
    
    function addcontactclick(){
        navigate("/addcontact");
    }

    function delContact(id){
        axios.delete(`https://64785a42362560649a2d982e.mockapi.io/contacts/${id}`);
        setContactlist([...contactlist])
      }
    
      function editContact(item){
        navigate(`/editcontact`,{state:item});
      }  
    return(
        <>
            <div className="d-flex justify-space-between">
                <h2 className="col-6">Contact</h2>
                <button className="btn btn-success col-2" onClick={addcontactclick}>Add contact</button>
            </div>
            <table className="table table-striped">
                <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {contactlist.map((item,index)=>
                <tr key={index}>
                    <td><img src={item.avatar} style={{with:60,height:60}}></img>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td><button className="btn btn-primary" onClick={()=>editContact(item)}>Edit</button><button className="btn btn-danger" onClick={()=>delContact(item.id)}>Delete</button></td>
                </tr>)}
                </tbody>
            </table>
        </>
    )
}
export default Home;