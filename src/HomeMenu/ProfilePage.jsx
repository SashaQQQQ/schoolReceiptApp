import { useContext, useState, useEffect, use } from "react";
import { ProfileContext } from "../ProfileContext";
import supabase from "../SupabaseClient";
import "./ProfilePage.css";

function ProfilePage() {
  const { profile, setPageStatus } = useContext(ProfileContext);

  const [favourites, setFavourites] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);

  async function fetchFavourites() {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("idUser", profile.id);

    if (error) {
      console.error("Error fetching favorites:", error);
    } else {
      const { data: favRecipes, error: recipesError } = await supabase
        .from("reciepts")
        .select("*")
        .in(
          "id",
          data.map((fav) => fav.idRecipe),
        );
      setFavourites(favRecipes);
    }
  }

  async function fetchCreatedRecipes() {
    const { data, error } = await supabase
      .from("reciepts")
      .select("*")
      .eq("Author", profile.email);

    if (error) {
      console.error("Error fetching created recipes:", error);
    } else {
      setCreatedRecipes(data);
    }
  }

  async function DeleteRecipe(recipe) {
    const { error } = await supabase
      .from("reciepts")
      .delete()
      .eq("id", recipe.id);

    if (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
      return;
    } else {
      fetchCreatedRecipes();
    }
  }

  useEffect(() => {
    fetchFavourites();
    fetchCreatedRecipes();
  }, []);
  return (
    <section className="profilePage">
      <div className="profileCard">
        <div className="avatar">{"👤"}</div>

        <h2>{profile?.email}</h2>

        <h3 className="listTitle">Favorites recipes</h3>
        <ul className="recipesList">
          {favourites.map((fav) => (
            <li key={fav.idRecipe}>
              <div className="recipeCard">
                <h1>{fav.NameOfRecipe}</h1>
                <h4>Author: {fav.Author}</h4>
                <h4>{fav.Date}</h4>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="listTitle">Created recipes</h3>
        <ul className="recipesList">
          {createdRecipes.map((recipe) => (
            <li key={recipe.id}>
              <div className="recipeCard">
                <h4>{recipe.NameOfReciept}</h4>
                <h4>{recipe.Date}</h4>
                <button onClick={() => DeleteRecipe(recipe)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="profileActions">
          <button
            className="primary"
            onClick={() => setPageStatus("addRecipe")}
          >
            Add recipe
          </button>
          <button onClick={() => setPageStatus("home")}>Back to Home</button>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
