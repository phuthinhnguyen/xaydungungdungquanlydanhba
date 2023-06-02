import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
function Editcontact(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const [valueinput,setValueinput] = useState(state);
    const [selectedFile, setSelectedFile] = useState();
    const [avatar,setAvatar] = useState();

    function handleChange(e){
        setValueinput({...valueinput,[e.target.name]:e.target.value})
    }

    function editContact(e){
        e.preventDefault();
        console.log(avatar)
        axios.put(`https://64785a42362560649a2d982e.mockapi.io/contacts/${valueinput.id}`,{
            name:valueinput.name,
            email:valueinput.email,
            phone:valueinput.phone,
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
            console.log(res.data.Url)
          })
          .catch(err => {
            console.log(err);
          });
    }
    return(
        <>
            <h2>Edit contact</h2>
            <form className="ml-3 mb-3" onSubmit={(e)=>editContact(e)}>
            <input type="file" id="avatar" className="form-control" onChange={(e)=>avatarchange(e)}></input><br></br>
            <label>Name</label><br></br>
            <input id="name" value={valueinput.name} onChange={(e)=>handleChange(e)} name="name"></input><br></br>
            <label>Email</label><br></br>
            <input id="email" value={valueinput.email} onChange={(e)=>handleChange(e)} name="email"></input><br></br>
            <label>Phone</label><br></br>
            <input id="phone" value={valueinput.phone} onChange={(e)=>handleChange(e)} name="phone"></input><br></br>
            <button className="btn btn-success mt-2" type="submit">Edit</button>
            </form>
        </>
        
    )
}
export default Editcontact;