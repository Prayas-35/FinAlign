import React from 'react'
import './SignupPage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Sign up for an account</h2>
            <p className="mt-2 text-muted-foreground">Enter your details below to create a new account.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className='p-4'>UserName</label>
              <input id="name" name="username" type="text" required  value={formData.username} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="email" className='p-4'>Email address</label>
              <input id="email"  name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="password" className='p-4'>Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="confirmPassword" className='p-4'>Confirm Password</label>
              <input id="confirmPassword"  name="confirmPassword" type="password" autoComplete="current-password" required value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <button type="submit" className="w-full">
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
