import { useState, useContext } from "react";
import supabase from "../SupabaseClient.js";
import "./LogInPage.css";
import { ProfileContext } from "../ProfileContext.js";

function LoginPage({ setPageStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setProfile } = useContext(ProfileContext);
  const [warningStatus, setWarningStatus] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) {
      setWarningStatus(true);
      setWarningMessage("Please fill in all fields.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setWarningStatus(true);
      setWarningMessage(error.message);
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
        {warningStatus && (
          <p style={{ color: "red" }} className="error">
            {warningMessage}
          </p>
        )}
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
