import { FaBars, FaBoxOpen, FaChartBar, FaExchangeAlt } from "react-icons/fa";
import canecaBeer2 from "../assets/canecaBeer2.png";
import "../styles/Sidebar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MovementModal from "./MovementModal";

export default function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
    }, []);

    return (
        <>
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <button
                    className="sidebar-toggle"
                    type="button"
                    aria-label={
                        collapsed
                            ? "Expandir menu lateral"
                            : "Recolher menu lateral"
                    }
                    aria-expanded={!collapsed}
                    aria-controls="sidebar-navigation"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaBars aria-hidden="true" />
                </button>

                <div className="brand">

                    <img
                        src={canecaBeer2}
                        alt="Logotipo do StockBeer"
                        className="logo-sidebar"
                    />

                    <div className="brand-text">
                        <h2>
                            Stock<span>Beer</span>
                        </h2>

                        <p>Gestão de Bebidas</p>
                    </div>

                </div>

                <nav id="sidebar-navigation" aria-label="Menu principal">

                    <a href="/dashboard" onClick={(e) => { e.preventDefault(); navigate("/dashboard");}} className={location.pathname === "/dashboard" ? "active" : ""}>
                        <FaChartBar aria-hidden="true" />
                        <span>Dashboard</span>
                    </a>

                    <a href="/estoque" onClick={(e) => { e.preventDefault(); navigate("/estoque");}} className={location.pathname === "/estoque" ? "active" : ""}>
                        <FaBoxOpen aria-hidden="true" />
                        <span>Estoque</span>
                    </a>

                    <button
                        type="button"
                        className={location.pathname === "/entradas/saidas" ? "active" : ""}
                        aria-label="Registrar entradas e saídas"
                        aria-haspopup="dialog"
                        aria-expanded={modalAberto}
                        aria-controls="movement-modal"
                        onClick={() => setModalAberto(true)}
                    >
                        <FaExchangeAlt aria-hidden="true" />
                        <span>Entradas/Saídas</span>
                    </button>

                </nav>

                <div className="admin-box">

                    <div className="avatar" aria-hidden="true">
                        {usuario?.nome?.charAt(0).toUpperCase() || "A"}
                    </div>

                    <div className="admin-info" aria-label="Usuário autenticado">
                        <strong>{usuario?.nome}</strong>
                        <p>{usuario?.email}</p>
                    </div>

                </div>

            </aside>
            <MovementModal aberto={modalAberto} onClose={() => setModalAberto(false)} />
        </>
    );
}