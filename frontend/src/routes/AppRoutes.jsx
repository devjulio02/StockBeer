import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import EstoqueBebidas from "../pages/EstoqueBebidas";
import CadastroBebidas from "../pages/CadastroBebidas";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route 
          path="/estoque"
          element={
            <ProtectedRoute>
              <EstoqueBebidas />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/cadastro-bebidas" 
          element={
            <ProtectedRoute>
              <CadastroBebidas />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}