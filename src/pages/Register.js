import React, { useState } from 'react';
import axios from 'axios';
import logo from '../static/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const Register = () => {
  const [registrationStatus, setRegistrationStatus] = useState('');
  const history = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const full_name = event.target.full_name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(full_name);
    console.log(email)
    console.log(password)

    try {
      const response = await axios.post('http://13.125.141.67/api/v1/user_app/signup/', {
        full_name,
        email,
        password,
      });
      console.log(response)
      if (response.status === 200) {
        setRegistrationStatus('success');   
        history('/login'); // Navigate to the login page
      } else {
        setRegistrationStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setRegistrationStatus('error');
    }
  };

  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      <div className="w-1/3 flex flex-col justify-center items-center h-3/4 bg-gray-100 rounded-lg shadow-md">
        <Link to="/" className="login-logo">
          <img className="w-72 h-32 mr-2" src={logo} alt="" />
        </Link>
        <div className="p-6 space-y-4 text-center md:space-y-6 sm:p-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign up
          </h1>
          <form className="space-y-4 md:space-y-6 w-72 items-center text-center" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="name" className="text-left block mb-2 text-sm font-medium text-gray-900">Full Name</label>
              <input type="text" name="full_name" id="name" className="w-72 border border-gray-300 rounded-md p-2" placeholder="Name" required="" />
            </div>
            <div>
              <label htmlFor="email" className="text-left block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" name="email" id="email" className="w-72 border border-gray-300 rounded-md p-2" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" className="w-72 border border-gray-300 rounded-md p-2 focus:ring-primary-600 focus:border-primary-600" placeholder="••••••••" required="" />
            </div>
            <button
              type="submit"
              className="w-52 bg-gray-200 p-2 text-black rounded-md hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300"
              disabled={registrationStatus === 'success'}
            >
              {registrationStatus === 'success' ? 'Registered' : 'Sign up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
