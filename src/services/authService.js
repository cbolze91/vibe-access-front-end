const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signup = async (formData) => {
  const response = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.err) {
    throw new Error(data.err);
  }

  if (data.token) {
    localStorage.setItem('token', data.token);
    return JSON.parse(atob(data.token.split('.')[1])).user;
  }
};

const signin = async (formData) => {
  const response = await fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.err) {
    throw new Error(data.err);
  }

  if (data.token) {
    localStorage.setItem('token', data.token);
    return JSON.parse(atob(data.token.split('.')[1])).user;
  }
};

const signout = () => {
  localStorage.removeItem('token');
};

export {
  signup,
  signin,
  signout,
};