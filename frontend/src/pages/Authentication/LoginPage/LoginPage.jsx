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
      console.log(data);
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
        <div className="login-container">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Sign in to your account to continue.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button className="submit-button">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
