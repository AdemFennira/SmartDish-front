import "./PopularIngredients.css";

const ingredients = ["Poulet", "Tomate", "Fromage", "Pâtes", "Riz", "Oignon", "Ail", "Poivron"];

export default function PopularIngredients() {
  return (
    <div className="popular-ingredients">
      <h3>Ingrédients populaires :</h3>
      <div className="tags">
        {ingredients.map((item, index) => (
          <span key={index} className="tag">{item}</span>
        ))}
      </div>
    </div>
  );
}
