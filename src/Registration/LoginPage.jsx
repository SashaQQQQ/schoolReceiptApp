import { useState, useContext } from "react";
import supabase from "../SupabaseClient.js";
import "./LoginPage.css";
import { ProfileContext } from "../ProfileContext.js";

function LoginPage({ setPageStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setProfile } = useContext(ProfileContext);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      console.log("User logged in:", data);
      setProfile(data.user);
      setPageStatus("home");
    }
  }

  return (
    <div className="LoginPage">
      <h1>Log in </h1>
      <p>Fill the fields below to log in.</p>

      <form>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleEmailChange} required />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handlePasswordChange} required />
        </div>

        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="submit"
        >
          Log In
        </button>
        <p>No account yet?</p>
        <button onClick={() => setPageStatus("signup")}>Sign Up</button>
      </form>
    </div>
  );
}

export default LoginPage;
