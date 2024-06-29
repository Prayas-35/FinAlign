import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
    <div className="flex min-h-[100vh] flex-col">
    <header className="flex items-center justify-between px-6 py-4 bg-background shadow">
        <Link to='/' className="text-lg font-bold" prefetch={false}>
        <a>FinAlign</a>
        </Link>
        <div className="flex items-center gap-4">
          <Link to='/login' className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Link
            to='/signup'
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            <a>SignUp</a>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Sign in to your account to continue.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className='space-y-1'>
              <label htmlFor="username" className='p-4'>Username</label>
              <input id="username" type="text" placeholder="john_doe" name='username' value={formData.username} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className='p-4'>Email</label>
              <input id="email" type="email" placeholder="john@example.com" name='email' value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className='p-4'>Password</label>
              <input id="password" type="password" name='password' value={formData.password} onChange={handleChange} />
            </div>
            <button className="w-full">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;