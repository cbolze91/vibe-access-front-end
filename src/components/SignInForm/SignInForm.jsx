import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../services/authService";
import { UserContext } from "../../context/UserContext";

function SignInForm() {
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    try {
      const data = await authService.signIn(formData);

      if (data?.token) {
        login(data.token);
        navigate("/");
      } else {
        setErrorMessage("Sign in failed.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

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

        <button type="submit">
          Sign In
        </button>
      </form>
    </main>
  );
}

export default SignInForm;
