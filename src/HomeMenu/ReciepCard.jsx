import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import supabase from "../SupabaseClient";
import "./Home.css";

function RecipeCard({ recipe }) {
  const [isFav, setIsFav] = useState(false);
  const { profile, setPageStatus, setRecipe } = useContext(ProfileContext);
  async function toggleFavorite(currentFav) {
    if (!profile?.id) return;

    const { data: existing, error: checkError } = await supabase
      .from("favorites")
      .select("id")
      .eq("idUser", profile.id)
      .eq("idRecipe", recipe.id)
      .maybeSingle();

    if (checkError) {
      console.error(checkError);
      return;
    }

    if (existing) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("idUser", profile.id)
        .eq("idRecipe", recipe.id);

      if (error) console.error(error);

      setIsFav(false);
    } else {
      const { error } = await supabase.from("favorites").insert({
        idUser: profile.id,
        idRecipe: recipe.id,
        NameOfRecipe: recipe.NameOfReciept,
      });

      if (error) console.error(error);

      setIsFav(true);
    }
  }

  return (
    <div
      className="recipeCard"
      onClick={() => {
        setPageStatus("recipePreview");
        setRecipe(recipe);
      }}
    >
      <h1
        className={`starBtn ${isFav ? "active" : ""}`}
        onClick={() => {
          setIsFav((prev) => !prev);
          toggleFavorite(isFav);
        }}
      >
        ★
      </h1>

      <h2>{recipe.NameOfReciept}</h2>
      <h5>Author: {recipe.Author}</h5>
      <p>{recipe.Date}</p>
    </div>
  );
}
export default RecipeCard;
