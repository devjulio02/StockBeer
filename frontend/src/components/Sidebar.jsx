import { FaBars, FaBoxOpen, FaChartBar, FaExchangeAlt } from "react-icons/fa";
import canecaBeer2 from "../assets/canecaBeer2.png";
import "../styles/Sidebar.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MovementModal from "./MovementModal";

export default function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <button
                    className="sidebar-toggle"
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaBars />
                </button>

                <div className="brand">

                    <img
                        src={canecaBeer2}
                        alt="StockBeer"
                        className="logo-sidebar"
                    />

                    <div className="brand-text">
                        <h2>
                            Stock<span>Beer</span>
                        </h2>

                        <p>Gestão de Bebidas</p>
                    </div>

                </div>

                <nav>

                    <a onClick={() => navigate("/dashboard")} className={location.pathname === "/dashboard" ? "active" : ""}>
                        <FaChartBar />
                        <span>Dashboard</span>
                    </a>

                    <a onClick={() => navigate("/estoque")} className={location.pathname === "/estoque" ? "active" : ""}>
                        <FaBoxOpen />
                        <span>Estoque</span>
                    </a>

                    <a onClick={() => setModalAberto(true)} className={location.pathname === "/entradas/saidas" ? "active" : ""}>
                        <FaExchangeAlt />
                        <span>Entradas/Saídas</span>
                    </a>

                </nav>

                <div className="admin-box">

                    <div className="avatar">
                        A
                    </div>

                    <div className="admin-info">
                        <strong>Admin</strong>
                        <p>admin@stockbeer.com</p>
                    </div>

                </div>

            </aside>
            <MovementModal aberto={modalAberto} onClose={() => setModalAberto(false)} />
        </>
    );
}