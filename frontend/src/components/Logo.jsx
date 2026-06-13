import canecaBeer from "../assets/CanecaBeer.png";

export default function Logo() {
  return (
    <div className="logo-container">

        <div className="logo-icon">
            <img src={canecaBeer} alt="StockBeer" className="logo-image"/>
        </div>

        <h1>
            Stock<span>Beer</span>
        </h1>

        <p>Sistema de Gestão de Bebidas</p>

    </div>
  );
}