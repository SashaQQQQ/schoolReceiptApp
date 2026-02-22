import { use, useContext, useEffect, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import "./Home.css";
import NavBar from "./NavBar.jsx";
import RecipesGrid from "./RecipesGrid.jsx";
import Categories from "./Categories.jsx";
import Searching from "./Searching.jsx";
function Home() {
  const { profile } = useContext(ProfileContext);
  const [currentSearchingType, setCurrentSearchingType] = useState("All");
  const { setPageStatus } = useContext(ProfileContext);
  useEffect(() => {
    console.log("User profile in Home component:", profile);
  }, []);
  useEffect(() => {
    console.log("Current searching type:", currentSearchingType);
  }, [currentSearchingType]);
  return (
    <div className="Home">
      <NavBar />
      <Searching />
      <Categories
        currentSearchingType={currentSearchingType}
        setCurrentSearchingType={setCurrentSearchingType}
      />

      <RecipesGrid currentSearchingType={currentSearchingType} />
      <button
        className="addRecipeBtn"
        onClick={() => setPageStatus("addRecipe")}
      >
        + Add Recipe
      </button>
    </div>
  );
}

export default Home;
