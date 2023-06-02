const {useState, useEffect} = React;

function App(){
  const [contactlist, setContactlist] = useState([]);
  const [valueinput, setValueinput ] = useState({id:null,name:"",email:"",phone:""});
  const [selectedFile, setSelectedFile] = useState();
  useEffect(()=>{
    axios.get("https://64785a42362560649a2d982e.mockapi.io/contacts")
    .then(res=>setContactlist(res.data))
    .catch(err=>{console.log(err)})
  },[contactlist])

  function addContact(e){
    e.preventDefault();
    if (valueinput.id){
      axios.put(`https://64785a42362560649a2d982e.mockapi.io/contacts/${valueinput.id}`,{
       name:valueinput.name,
       email:valueinput.email,
       phone:valueinput.phone
      })
    }
    else{
        const fd = new FormData();
        fd.append("file", document.getElementById("avatar").value);
        axios.post("https://64785a42362560649a2d982e.mockapi.io/contacts",{
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        avatar: fd
      })
    }
    document.getElementById("addform").reset();
    setContactlist([...contactlist])
    setValueinput({id:null,name:"",email:"",phone:""})
  }

  function delContact(id){
    axios.delete(`https://64785a42362560649a2d982e.mockapi.io/contacts/${id}`);
    setContactlist([...contactlist])
  }

  function editContact(item){
    setValueinput(item);
    
  }

  function handleChange(e){
    setValueinput({...valueinput,[e.target.name]:e.target.value})
  }
  return (
    <>
      <div className="d-flex justify-space-between">
        <h2 className="col-6">Contact</h2>
        <button className="btn btn-success col-2">Add contact</button>
      </div>


      <h2>Add contact</h2>
      <form className="ml-3 mb-3" onSubmit={(e)=>addContact(e)} id="addform">
        <input type="file" id="avatar"></input><br></br>
        <label>Name</label><br></br>
        <input id="name" value={valueinput.name} onChange={(e)=>handleChange(e)} name="name"></input><br></br>
        <label>Email</label><br></br>
        <input id="email" value={valueinput.email} onChange={(e)=>handleChange(e)} name="email"></input><br></br>
        <label>Phone</label><br></br>
        <input id="phone" value={valueinput.phone} onChange={(e)=>handleChange(e)} name="phone"></input><br></br>
        <button className="btn btn-success mt-2" type="submit">Add</button>
      </form>


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



ReactDOM.createRoot(document.getElementById('root')).render(<App/>);