import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PopularIngredients from "../components/PopularIngredients";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";
import "./Home.css"

export default function Home() {
  const recipes = [
    { title: "Poulet au four", time: "35 min", image: "../public/images/poulet-au-four.png", rating: 4.5 },
    { title: "Salade Cesar", time: "15 min", image: "../public/images/salade-cesar.png", rating: 4.2 },
  ];

  return (
    <div>
      <Header />
      <SearchBar />
      <PopularIngredients />
      <div className="recipes">
        {recipes.map((r, i) => <RecipeCard key={i} {...r} />)}
      </div>
      <Footer />
    </div>
  );
}

