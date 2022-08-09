import "./App.css";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

	return <div className="App">
    <Routes>
      <Route path={"/*"} element={<Navigate to={"/Home"}/>}/>
      <Route path="/Home/*" element={<Home/>} />
      <Route path="/Admin/*" element={<Admin/>} />
    </Routes>
    
  </div>;
}

export default App;
