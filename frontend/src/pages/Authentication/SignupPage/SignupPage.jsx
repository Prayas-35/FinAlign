import React from 'react'
import './SignupPage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password, // Assuming the backend expects these fields
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to homepage if response is okay
        navigate('/dashboard'); // Adjust the path as needed
      } else {
        // Handle errors or invalid responses
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div>
      <div className="flex min-h-[100dvh] bg-black text-white flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 border-2 border-customteal rounded-lg p-3">
            <div className='flex items-center justify-center flex-col'>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign up for an account</h2>
              <p className="mt-2 text-muted-foreground">Enter your details below to create a new account.</p>
            </div>
            <form className="space-y-6 flex items-center justify-center flex-col " onSubmit={handleSubmit} >
              <div>
                <label htmlFor="name" className='px-2 py-2'>UserName</label>
                <input id="name" name="username" className=" px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal" type="text" required value={formData.username} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className='px-2 py-2'>Email address</label>
                <input id="email" name="email" type="email" className=" px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal" autoComplete="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className='px-2 py-2'>Password</label>
                <input id="password" name="password" className=" px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="confirmPassword" className='px-2 py-2'>Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" className="px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal" type="password" autoComplete="current-password" required value={formData.confirmPassword} onChange={handleChange} />
              </div>
              <button type="submit" className="text-[1.1rem] bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-[2.2rem] py-[0.9rem] text-center mb-2  ">
                Sign up
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SignupPage
