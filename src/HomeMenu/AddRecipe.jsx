import { useState, useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import supabase from "../SupabaseClient";
import "./Home.css";

function AddRecipe() {
  const { profile, setPageStatus } = useContext(ProfileContext);

  const [form, setForm] = useState({
    NameOfReciept: "",
    Reciept: "",
    Type: "Breakfast",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("reciepts").insert({
      Author: profile.email,
      Date: new Date().toLocaleDateString(),
      ...form,
    });
    if (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
      return;
    }
    console.log("Recipe added:", form);

    setPageStatus("home");
  }

  return (
    <section className="AddRecipeForm">
      <form onSubmit={handleSubmit} className="formCard">
        <h2>Add new recipe 🍲</h2>

        <input
          name="NameOfReciept"
          placeholder="Recipe name"
          value={form.NameOfReciept}
          onChange={handleChange}
          required
        />

        <textarea
          name="Reciept"
          placeholder="Recipe description..."
          value={form.Reciept}
          onChange={handleChange}
          required
        />

        <select name="Type" value={form.Type} onChange={handleChange}>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Desserts</option>
        </select>

        <div className="formActions">
          <button type="button" onClick={() => setPageStatus("home")}>
            Cancel
          </button>

          <button type="submit" className="primary">
            Save recipe
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddRecipe;
