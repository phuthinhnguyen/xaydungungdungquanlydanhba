
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Addbook from "./Component/Addbook";
import Editbook from "./Component/Editbook";
function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/addbook" element={<Addbook/>} ></Route>
      <Route path="/editbook/" element={<Editbook/>} ></Route>
    </Routes>
  )
}

export default App;