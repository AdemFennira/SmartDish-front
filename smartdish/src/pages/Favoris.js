import { useState } from "react"
import { Link } from "react-router-dom"
import "./Favoris.css"

const FAVORITE_RECIPES = [
  {
    id: 1,
    title: "Risotto crémeux aux champignons",
    image: "/risotto-champignons-plat-cuisine.jpg",
    cookTime: "25 min",
    servings: 4,
    rating: 4.8,
    tags: ["Végétarien", "Italien"],
    addedDate: "il y a 2 jours",
  },
  {
    id: 2,
    title: "Salade de quinoa colorée",
    image: "/salade-quinoa-coloree-healthy.jpg",
    cookTime: "15 min",
    servings: 2,
    rating: 4.6,
    tags: ["Healthy", "Vegan"],
    addedDate: "il y a 3 jours",
  },
  {
    id: 3,
    title: "Saumon grillé aux herbes",
    image: "/saumon-grill--herbes-fra-ches.jpg",
    cookTime: "20 min",
    servings: 2,
    rating: 4.7,
    tags: ["Protéiné", "Healthy"],
    addedDate: "il y a 1 semaine",
  },
]

export default function Favorites() {
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState(FAVORITE_RECIPES)

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id))
  }

  const filteredFavorites = favorites.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="favorites-page">
      {/* BADGE */}
      <div className="favorites-badge">
        <span className="heart">❤️</span>
        <span>Mes favoris</span>
      </div>

      <h1>Mes recettes favorites</h1>
      <p className="subtitle">
        Retrouvez toutes vos recettes préférées sauvegardées pour plus tard.
      </p>

      {/* SEARCH */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher dans mes favoris..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="filter-btn">Filtrer</button>
      </div>

      <p className="count">{filteredFavorites.length} recettes favorites</p>

      {/* CONTENU PRINCIPAL */}
      {filteredFavorites.length > 0 ? (
        <div className="favorites-grid">
          {filteredFavorites.map((recipe) => (
            <div key={recipe.id} className="favorite-card">
              {/* IMAGE */}
              <div className="image-wrapper">
                <img src={recipe.image} alt={recipe.title} />

                <div className="image-infos">
                  <span>⏱ {recipe.cookTime}</span>
                  <span>👤 {recipe.servings}</span>
                </div>

                <button
                
                  className="delete-btn"
                  onClick={() => removeFavorite(recipe.id)}
                  aria-label="Supprimer des favoris"
                >
                  🗑
                </button>
              </div>

              {/* CONTENT */}
              <div className="card-content">
                <h3>{recipe.title}</h3>
                <p className="added">Ajouté {recipe.addedDate}</p>

                <p className="rating">⭐ {recipe.rating}</p>

                <div className="tags">
                  {recipe.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <Link to={`/recette/${recipe.id}`} className="view-btn">
                  Voir la recette
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="empty-state">
          <div className="empty-icon">🤍</div>
          <h3>Aucun favori trouvé</h3>
          <p>Essayez de modifier votre recherche.</p>
        </div>
      )}
    </div>
  )
}
