import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Mot de passe:", password);
    console.log("Se souvenir de moi:", remember);
  };

  return (
    <div className="login-container">

      {/* --- En-tête SmartDish --- */}
      <header className="login-header">
        <h1 className="logo">🍽 SmartDish</h1>
      </header>

      {/* --- Contenu principal --- */}
      <div className="login-content">
        <h2>Se connecter</h2>
        <p>Accédez gratuitement à de nombreux avantages sur SmartDish.</p>

        <form onSubmit={handleSubmit}>
          <label>Adresse email*</label>
          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe*</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />{" "}
              Se souvenir de moi
            </label>
            <a href="#">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="submit-btn">SE CONNECTER</button>
        </form>

        <p className="register-link">
          Je n’ai pas de compte, <a href="#">je m’inscris</a>
        </p>
      </div>
    </div>
  );
}
