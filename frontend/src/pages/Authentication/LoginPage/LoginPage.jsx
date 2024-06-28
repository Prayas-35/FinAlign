import React from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password, // Assuming the backend expects these fields
        }),
      });

      if (response.ok) {
        // Redirect to homepage or dashboard if response is okay
        navigate('/'); // Adjust the path as needed
      } else {
        // Handle errors or invalid responses
        alert("Login failed.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  };


  return (

      <div className="flex min-h-[100dvh] flex-col">
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
              <div className="space-y-1">

                <label htmlFor="email"  className='p-4'>Email</label>
                <input id="email" type="email" placeholder="john@example.com"  name='email'/>
              </div>
              <div className="space-y-1">
                <label htmlFor="password"  className='p-4'>Password</label>
                <input id="password" type="password" name='password' />
              </div>
              <button className="w-full">Login</button>
            </form>
          </div>
          </main>
        </div>

  )
}

export default LoginPage
