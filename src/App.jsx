import "./App.css";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import { Routes, Route } from 'react-router-dom'

function App() {

	return <div className="App">
    <Routes>
      <Route path="/Home/*" element={<Home/>} />
      <Route path="/Admin/*" element={<Admin/>} />
    </Routes>
    
  </div>;
}

export default App;
