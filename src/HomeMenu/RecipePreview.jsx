import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import "./ReciepePriview.css";

function RecipePreview({ recipe }) {
  const { setPageStatus } = useContext(ProfileContext);

  return (
    <section className="recipePreview">
      <div className="previewCard">
        <div className="previewHeader">
          <div className="previewType">{recipe?.Type}</div>
          <h1>{recipe?.NameOfReciept}</h1>

          <div className="previewMeta">
            <span>👤 {recipe?.Author}</span>
            <span>📅 {recipe?.Date}</span>
          </div>
        </div>

        <div className="previewBody">
          <h3>Description</h3>
          <p>{recipe?.Reciept}</p>
        </div>

        <div className="previewActions">
          <button onClick={() => setPageStatus("home")}>Back</button>
        </div>
      </div>
    </section>
  );
}

export default RecipePreview;
