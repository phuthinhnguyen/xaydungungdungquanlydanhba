import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Addcontact(){
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();
    const [avatar,setAvatar] = useState();
    function addContact(e){
        e.preventDefault();
        axios.post("https://64785a42362560649a2d982e.mockapi.io/contacts",{
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        avatar:avatar
        })
        .then(navigate("/"))
      }
    
    function avatarchange(e){
        setSelectedFile(e.target.files[0]);
        const fd = new FormData();
        fd.append("file", selectedFile);
        axios.post("https://v2.convertapi.com/upload", fd)
          .then(res => {
            setAvatar(res.data.Url);
          })
          .catch(err => {
            console.log(err);
          });
    }
    return(
        <>
            <h2>Add contact</h2>
            <form className="ml-3 mb-3" onSubmit={(e)=>addContact(e)}>
                <input type="file" id="avatar" className="form-control" onChange={(e)=>avatarchange(e)}></input><br></br>
                <label>Name</label><br></br>
                <input id="name" ></input><br></br>
                <label>Email</label><br></br>
                <input id="email" ></input><br></br>
                <label>Phone</label><br></br>
                <input id="phone"></input><br></br>
                <button className="btn btn-success mt-2" type="submit">Add</button>
            </form>
        </>
        
    )
}
export default Addcontact;