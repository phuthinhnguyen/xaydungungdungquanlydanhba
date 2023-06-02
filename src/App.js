
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Addcontact from "./Component/Addcontact";
import Editcontact from "./Component/Editcontact";
function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/addcontact" element={<Addcontact/>} ></Route>
      <Route path="/editcontact/" element={<Editcontact/>} ></Route>
    </Routes>
  )
}

export default App;