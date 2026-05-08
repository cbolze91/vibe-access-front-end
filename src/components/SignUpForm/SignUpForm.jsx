import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext';
import * as authService from '../../services/authService';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (event) => {
    setMessage('');
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.signup(formData);
      setUser(user);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signup-username">Username</label>
          <input
            id="signup-username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConf">Confirm Password</label>
          <input
            id="passwordConf"
            name="passwordConf"
            type="password"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        <button disabled={isFormInvalid()}>Sign Up</button>
      </form>
    </main>
  );
};

export default SignUpForm;