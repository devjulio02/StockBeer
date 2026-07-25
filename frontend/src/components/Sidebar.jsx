import { FaBars, FaBoxOpen, FaChartBar, FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";
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

    function handleLogout() {

        localStorage.removeItem("usuario");

        setUsuario(null);

        navigate("/");

    }

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

                    <a href="/dashboard" onClick={(e) => { e.preventDefault(); navigate("/dashboard");}} className={!modalAberto && location.pathname === "/dashboard" ? "active" : ""}>
                        <FaChartBar aria-hidden="true" />
                        <span>Dashboard</span>
                    </a>

                    <a href="/estoque" onClick={(e) => { e.preventDefault(); navigate("/estoque");}} className={!modalAberto && location.pathname === "/estoque" ? "active" : ""}>
                        <FaBoxOpen aria-hidden="true" />
                        <span>Estoque</span>
                    </a>

                    <button
                        type="button"
                        className={modalAberto ? "active" : ""}
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
                
                <div className="admin-container">

                  <div
                        className="admin-box"
                        tabIndex={0}
                        aria-label={
                            `Perfil do usuário logado. ` +
                            `Usuário logado: ${usuario?.nome || "Não identificado"}. ` +
                            `E-mail do usuário logado: ${usuario?.email || "Não informado"}.`
                        }
                    >

                        <div className="avatar" aria-hidden="true">
                            {usuario?.nome?.charAt(0).toUpperCase() || "A"}
                        </div>

                        <div className="admin-info">

                            <strong>{usuario?.nome}</strong>

                            <p>{usuario?.email}</p>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                        aria-label="Sair do sistema"
                    >
                        <FaSignOutAlt aria-hidden="true" />
                        <span>Logout</span>
                    </button>

                </div>

            </aside>
            <MovementModal aberto={modalAberto} onClose={() => setModalAberto(false)} />
        </>
    );
}