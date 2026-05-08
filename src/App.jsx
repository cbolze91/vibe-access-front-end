import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import { UserContext } from './context/UserContext';

import Navbar from './components/Navbar/Navbar';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';

import './App.css';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/my-events" element={user ? <p>My Events page coming soon.</p> : <SignInForm />} />
        <Route path="/create" element={user ? <p>Create Event page coming soon.</p> : <SignInForm />} />
      </Routes>
    </>
  );
}

export default App;