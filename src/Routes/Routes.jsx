import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "../controllers/Login";
import Callback from "../controllers/Callback";
import Dashboard from "../pages/Dashboard";

export const Rutas =()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

