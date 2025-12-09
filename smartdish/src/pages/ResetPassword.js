import React, { useState } from "react";
import "./ResetPassword.css"; // CSS dédié à cette page

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="reset-container">
      {/* --- En-tête SmartDish --- */}
      <header className="reset-header">
        <h1 className="logo">🍽 SmartDish</h1>
      </header>

      {/* --- Contenu principal --- */}
      <div className="reset-content">
        <h2>Réinitialiser le mot de passe</h2>
        <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>

        <form onSubmit={handleSubmit}>
          <label>Adresse email*</label>
          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            ENVOYER LE LIEN
          </button>
        </form>

        <p className="login-link">
          <a href="/profil">Retour à la connexion</a>
        </p>
      </div>
    </div>
  );
}
