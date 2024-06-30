import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';

// Helper functions for validation (assuming they are defined elsewhere)
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const validatePassword = (password) => {
  return password.length >= 2;
};

const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

const SignupPage = () => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    let newErrors = { ...errors };
    if (name === 'email' && !validateEmail(value)) {
      newErrors.email = 'Invalid email address';
    } else if (name === 'password' && !validatePassword(value)) {
      newErrors.password = 'Password must be at least 2 characters';
    } else if (name === 'confirmPassword' && !validateConfirmPassword(formData.password, value)) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        login(data.token);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[100vh] bg-black text-white flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border-2 border-customteal rounded-lg p-6">
          <div className='flex items-center justify-center flex-col'>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign up for an account</h2>
            <p className="mt-2 text-muted-foreground">Enter your details below to create a new account.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="username" className='px-2 py-2'>UserName</label>
              <input id="username" name="username" className="px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" type="text" required value={formData.username} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className='px-2 py-2'>Email address</label>
              <input id="email" name="email" type="email" className="px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" autoComplete="email" required value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className='px-2 py-2'>Password</label>
              <input id="password" name="password" className="px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} />
              {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className='px-2 py-2'>Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" className="px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" type="password" autoComplete="current-password" required value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="text-[1.1rem] bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-[2.2rem] py-[0.9rem] text-center mb-2">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
