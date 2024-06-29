import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',   
    email: '',
    password: '',
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

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/dashboard'); // Adjust the path as needed
        login(data.token);
      } else {
        console.log(data)
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
        <div className="space-y-4 border-2 border-customteal rounded-lg p-3 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Sign in to your account to continue.</p>
          <form className="space-y-4 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
            <div className='space-y-1'>
              <label htmlFor="username" className='p-4 '>Username</label>
              <input id="username" type="text" className='px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal'  name='username' value={formData.username} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className='p-4'>Email</label>
              <input id="email" type="email" className='px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal'  name='email' value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className='p-4'>Password</label>
              <input id="password" type="password" className='px-2 text-black border-2 border-customteal rounded-lg focus:outline-none focus:ring focus:ring-customteal' name='password' value={formData.password} onChange={handleChange} />
            </div>
            <button className="text-[1.1rem] bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-[2.2rem] py-[0.9rem] text-center mb-2">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;