import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-section">
      <h2>Quels ingrédients avez-vous ?</h2>
      <p>Entrez les ingrédients que vous avez sous la main et découvrez des recettes délicieuses.</p>
      <div className="search-bar">
        <input type="text" placeholder="Ajouter un ingrédient (ex : tomate, poulet, basilic...)" />
        <button>Trouver des recettes</button>
      </div>
    </div>
  );
}
