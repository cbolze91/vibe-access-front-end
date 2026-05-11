// src/components/SignInForm/SignInForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../services/authService";
import { useUser } from "../../context/useUser";

function SignInForm() {
  const navigate = useNavigate();
  const { login } = useUser();

  // Keeps track of what the user types.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Shows a helpful message if sign in fails.
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
      const data = await authService.signIn(formData);

      // Saves the token and updates the navbar user right away.
      if (data?.token) {
        login(data.token);
        navigate("/");
      } else {
        setErrorMessage("Sign in failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage("Sign in failed. Please check that the backend is running.");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        {errorMessage && <p className="auth-message">{errorMessage}</p>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}

export default SignInForm;
