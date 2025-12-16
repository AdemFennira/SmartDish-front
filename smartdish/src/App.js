import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import ResetPassword from "./pages/ResetPassword"
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path ="/profil" element={<Profil />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  )
}

export default App;
