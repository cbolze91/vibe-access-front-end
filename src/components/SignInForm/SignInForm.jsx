import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';
import * as authService from '../../services/authService';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const handleChange = (event) => {
    setMessage('');
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.signin(formData);
      setUser(user);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-username">Username</label>
          <input
            id="signin-username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <button disabled={isFormInvalid()}>Sign In</button>
      </form>
    </main>
  );
};

export default SignInForm;