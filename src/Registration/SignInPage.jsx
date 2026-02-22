import { useState, useContext } from "react";
import supabase from "../SupabaseClient.js";
import "./LogInPage.css";
import { ProfileContext } from "../ProfileContext.js";

function SignInPage({ setPageStatus }) {
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    const user = data.user;

    if (error) {
      alert(error.message);
    } else {
      const { data: signInData, error: signInError } = await supabase
        .from("userProfile")
        .insert({ Email: email, Name: "", UserId: user.id, SecondName: "" });

      console.log("User signed up:", data);
      setProfile(data.user);
      setPageStatus("home");
    }
  }

  return (
    <div className="LoginPage">
      <h1>Sign in </h1>
      <p>Fill the fields below to create an account.</p>

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
          Sign Up
        </button>
        <p>Already have an account?</p>
        <button onClick={() => setPageStatus("login")}>Log In</button>
      </form>
    </div>
  );
}

export default SignInPage;
