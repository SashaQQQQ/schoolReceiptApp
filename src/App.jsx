import { useState } from "react";
import { ProfileContext } from "./ProfileContext.js";
import LoginPage from "./Registration/LoginPage.jsx";
import SignInPage from "./Registration/SignInPage.jsx";
import Home from "./HomeMenu/Home.jsx";
import AddRecipe from "./HomeMenu/AddRecipe.jsx";
import ProfilePage from "./HomeMenu/ProfilePage.jsx";
import RecipePreview from "./HomeMenu/RecipePreview.jsx";
import "./App.css";

function App() {
  const [reciepe, setRecipe] = useState("");
  const [profile, setProfile] = useState("");
  const [pageStatus, setPageStatus] = useState("login");
  return (
    <ProfileContext.Provider
      value={{
        reciepe,
        setRecipe,
        profile,
        setProfile,
        pageStatus,
        setPageStatus,
      }}
    >
      <div className="App">
        {pageStatus === "login" ? (
          <LoginPage setPageStatus={setPageStatus} />
        ) : null}
        {pageStatus === "signup" ? (
          <SignInPage setPageStatus={setPageStatus} />
        ) : null}
        {pageStatus === "home" ? <Home /> : null}
        {pageStatus === "addRecipe" ? <AddRecipe /> : null}
        {pageStatus === "profile" ? <ProfilePage /> : null}
        {pageStatus === "recipePreview" ? (
          <RecipePreview recipe={reciepe} />
        ) : null}
      </div>
    </ProfileContext.Provider>
  );
}

export default App;
