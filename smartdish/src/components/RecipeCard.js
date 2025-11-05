import "./RecipeCard.css";

export default function RecipeCard({ title, time, image, rating }) {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} />
      <div className="recipe-info">
        <h4>{title}</h4>
        <p>⏱ {time} | ⭐ {rating}</p>
        <div className="buttons">
          <button className="save">💾 Sauvegarder</button>
          <button className="cook">👨‍🍳 Cuisiner</button>
        </div>
      </div>
    </div>
  );
}
