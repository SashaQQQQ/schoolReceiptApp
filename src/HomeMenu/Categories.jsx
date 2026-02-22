import { useContext, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import "./Home.css";

function Categories({ currentSearchingType, setCurrentSearchingType }) {
  return (
    <section className="categories">
      <button
        className={currentSearchingType === "All" ? "active" : ""}
        onClick={() => setCurrentSearchingType("All")}
      >
        All
      </button>

      <button
        className={currentSearchingType === "Breakfast" ? "active" : ""}
        onClick={() => setCurrentSearchingType("Breakfast")}
      >
        Breakfast
      </button>

      <button
        className={currentSearchingType === "Lunch" ? "active" : ""}
        onClick={() => setCurrentSearchingType("Lunch")}
      >
        Lunch
      </button>

      <button
        className={currentSearchingType === "Dinner" ? "active" : ""}
        onClick={() => setCurrentSearchingType("Dinner")}
      >
        Dinner
      </button>

      <button
        className={currentSearchingType === "Desserts" ? "active" : ""}
        onClick={() => setCurrentSearchingType("Desserts")}
      >
        Desserts
      </button>
    </section>
  );
}

export default Categories;
