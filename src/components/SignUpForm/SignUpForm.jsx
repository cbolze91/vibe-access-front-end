import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../services/authService";
import { UserContext } from "../../context/UserContext";

function SignUpForm() {
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const data = await authService.signUp({
        username: formData.username,
        password: formData.password,
      });

      if (data?.token) {
        login(data.token);
        navigate("/");
      } else {
        setErrorMessage("Sign up failed.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        {errorMessage && (
          <p className="auth-message">{errorMessage}</p>
        )}

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

        <label htmlFor="confirmPassword">
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default SignUpForm;