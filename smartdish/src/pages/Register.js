import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    console.log("Nom d'utilisateur :", username);
    console.log("Email :", email);
    console.log("Mot de passe :", password);

    // Ici tu peux ajouter la logique d'inscription (API ou base de données)
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1 className="logo">🍽 SmartDish</h1>
      </header>

      <div className="register-content">
        <h2>Créer un compte</h2>
        <p>Rejoignez SmartDish et profitez de nombreux avantages.</p>

        <form onSubmit={handleSubmit}>
          <label>Nom d'utilisateur*</label>
          <input
            type="text"
            placeholder="Votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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

          <label>Confirmer le mot de passe*</label>
          <input
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">S'INSCRIRE</button>
        </form>

        <p className="login-link">
          Vous avez déjà un compte ? <Link to="/Profil">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
