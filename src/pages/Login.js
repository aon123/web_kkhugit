import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../static/logo.png';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [loginStatus, setLoginStatus] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const history = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post('http://13.125.141.67/api/v1/user_app/login/', {
        email,
        password,
      });

      if (response.status === 200) {
        setLoginStatus('success');
        const token = response.data.access_token;
        const user = response.data.user
        setAccessToken(token);

        // Save the access token to local storage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', user)

        // Redirect to the home page
        history('/');
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginStatus('error');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      <div className="w-1/3 flex flex-col justify-center items-center h-3/4 bg-gray-100 rounded-lg shadow-md">
        <Link to="/" className="login-logo">
          <img className="w-72 h-32 mr-2" src={logo} alt="" />
        </Link>
        <div className="p-6 space-y-4 text-center md:space-y-6 sm:p-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in
          </h1>
          <form className="space-y-4 w-72 md:space-y-6 items-center text-center" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email" className="text-left block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" name="email" id="email" className="w-72 border border-gray-300 rounded-md p-2" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" className="w-72  border border-gray-300 rounded-md p-2 focus:ring-primary-600 focus:border-primary-600" placeholder="••••••••" required="" />
            </div>
            <button type="submit" className="w-52 bg-gray-200 p-2 text-black rounded-md hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300">Sign in</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? 
              <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
