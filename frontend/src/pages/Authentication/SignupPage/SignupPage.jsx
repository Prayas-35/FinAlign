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
        <div className="max-w-md w-full space-y-8 border-2 border-customteal rounded-lg p-7" id='signup-box'>
          <div className='flex items-center justify-center flex-col'>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign up for an account</h2>
            <p className="mt-2 text-muted-foreground flex items-center justify-center text-center">Enter your details below to create a new account.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <svg id='icons1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <input id="username" autoComplete='off' name="username" placeholder='Username' className="px-2 p-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" type="text" required value={formData.username} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-2">
              <svg id='icons1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input id="email" autoComplete='off' name="email" type="email" placeholder='Email' className="px-2 p-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" required value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-col space-y-2">
              <svg id='icons1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input id="password" autoComplete='off' name="password" placeholder='Password' className="px-2 p-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" type="password" required value={formData.password} onChange={handleChange} />
              {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
            </div>
            <div className="flex flex-col space-y-2">
              <svg id='icons1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input id="confirmPassword" autoComplete='off' name="confirmPassword" placeholder='Confirm Password' className="px-2 p-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal w-full" type="password" required value={formData.confirmPassword} onChange={handleChange} />
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
