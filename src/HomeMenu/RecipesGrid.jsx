import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import supabase from "../SupabaseClient";
import RecipeCard from "./ReciepCard.jsx";
import "./Home.css";

function RecipesGrid({ currentSearchingType }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchRecipes() {
    setLoading(true);
    if (currentSearchingType === "All") {
      const { data, error } = await supabase.from("reciepts").select("*");

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        console.log("Fetched recipes:", data);
        setRecipes(data);
        setLoading(false);
      }
    } else {
      const { data, error } = await supabase
        .from("reciepts")
        .select("*")
        .eq("Type", currentSearchingType);

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    fetchRecipes();
  }, [currentSearchingType]);

  return (
    <section className="recipesGrid">
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes && recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <p>No recipes found</p>
      )}
    </section>
  );
}

export default RecipesGrid;
