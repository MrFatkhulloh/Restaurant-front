import "./App.css";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./Components/Login/Login";

function App() {

	return <div className="App">
    <Routes>
      <Route path={"/"} element={<Navigate to={"/Home"}/>}/>
      <Route path="/Home/*" element={<Home/>} />
      <Route path="/Admin/*" element={<Admin/>} />
      <Route path="/Login" element={<Login/>} />
    </Routes>
    
  </div>;
}

export default App;
