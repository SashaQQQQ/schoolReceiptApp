import { useState, useContext } from "react";
import supabase from "../SupabaseClient";
import { ProfileContext } from "../ProfileContext";
import "./Home.css";

function Searching() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setPageStatus, setRecipe } = useContext(ProfileContext);

  function handleSearch(e) {
    setCurrentPrompt(e.target.value);
  }

  async function performSearch() {
    if (!currentPrompt.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("reciepts")
      .select("*")
      .ilike("NameOfReciept", `%${currentPrompt}%`);

    if (error) {
      console.error(error);
    } else {
      setResults(data || []);
    }

    setLoading(false);
  }

  return (
    <section className="searchWrapper">
      <div className="searchSection">
        <input
          value={currentPrompt}
          onChange={handleSearch}
          type="text"
          placeholder="Search recipes..."
        />
        <button onClick={performSearch}>Search</button>
        {results.length > 0 && <p>{results.length} results found</p>}
      </div>

      <section className="searchResults">
        {loading ? (
          <p className="emptySearch">Searching...</p>
        ) : results.length === 0 ? (
          <p className="emptySearch">No results</p>
        ) : (
          results.map((recipe) => (
            <div key={recipe.id} className="searchItem">
              <div className="searchItemContent">
                <h3>{recipe.NameOfReciept}</h3>
                <p className="searchMeta">
                  Author: {recipe.Author} • {recipe.Type}
                </p>
              </div>

              <button
                onClick={() => {
                  setPageStatus("recipePreview");
                  setRecipe(recipe);
                }}
                className="openBtn"
              >
                Open
              </button>
            </div>
          ))
        )}
      </section>
    </section>
  );
}

export default Searching;
