import { use, useContext, useEffect, useState } from "react";
import { ProfileContext } from "../ProfileContext";
import supabase from "../SupabaseClient.js";
import "./Home.css";

function NavBar() {
  const { profile, setPageStatus } = useContext(ProfileContext);

  function handleLogout() {
    location.reload();
    console.log("User logged out");
  }

  return (
    <header className="navbar">
      <h2 className="logo">🍲 RecipeBook</h2>
      <div className="userSection" onClick={() => setPageStatus("profile")}>
        <span>
          {" "}
          <b>{profile?.email}</b>
        </span>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="logoutBtn"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}

export default NavBar;
