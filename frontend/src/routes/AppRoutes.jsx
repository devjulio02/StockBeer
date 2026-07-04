import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import EstoqueBebidas from "../pages/EstoqueBebidas";
import CadastroBebidas from "../pages/CadastroBebidas";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/estoque" element={<EstoqueBebidas />} />
        <Route path="/cadastro-bebidas" element={<CadastroBebidas />} />
      </Routes>
    </BrowserRouter>
  );
}