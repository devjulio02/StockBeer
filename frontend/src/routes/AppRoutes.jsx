import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import EstoqueBebidas from "../pages/EstoqueBebidas";
import CadastroBebidas from "../pages/CadastroBebidas";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/estoque" element={<EstoqueBebidas />} />
        <Route path="/cadastro-bebidas" element={<CadastroBebidas />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}