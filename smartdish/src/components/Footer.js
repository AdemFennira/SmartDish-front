import {Link} from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h4>SmartDish</h4>
        <p>Votre assistant culinaire intelligent.</p>
      </div>
      <div>
        <h4>Navigation</h4>
        <ul>
          <li>Accueil</li>
          <li>Suggestions</li>
          <li>
            <Link to="/profil">Mon profil</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>Aide & Support</li>
          <li>Nous contacter</li>
          <li>Presse</li>
        </ul>
      </div>
    </footer>
  );
}
