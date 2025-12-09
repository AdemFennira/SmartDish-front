import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
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
            <Link to="/profil">
                <FaUserCircle size={26} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
