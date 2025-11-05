import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

  return (
    <header className="header">
      <h1 className="logo">🍽 SmartDish</h1>
      <nav>
        <ul>
          <li>Accueil</li>
          <li>Recettes par ingrédients</li>
          <li>Suggestions</li>
          <li>Mes favoris</li>
          <li className="profile-icon">
            <Link to="/login">👤</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
