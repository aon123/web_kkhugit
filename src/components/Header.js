import logo from '../static/logo.png'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    
    const [user, setUser] = useState('');
    useEffect(() => {
        const user = localStorage.getItem('user');
        setUser(user);
      }, []);
    const history = useNavigate();
    const handleLogout = async () => {
        try {
          // Get the access token from local storage
          const token = localStorage.getItem('accessToken');
    
          // Set the authorization header with the access token
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
    
          // Call your logout API endpoint with the authorization header
          await axios.post('http://13.125.141.67/api/v1/user_app/logout/', null, config);
    
          // After successful logout, clear the access token from local storage
          localStorage.removeItem('accessToken');
    
          // Redirect to the login page
          history('/login');
        } catch (error) {
          console.error('Logout Error:', error);
          // Handle any logout error if needed
        }
      };

   

    return (
        <header className="w-full fixed top-0 z-10 bg-[#FCFCFC] text-black h-20 flex items-center shadow-md">
            <Link to='/'>
            <img src={logo} alt="Logo" className="h-20 ml-4 w-auto" /></Link>
            <div className="flex-grow flex items-center justify-center">
                <div className="relative w-[450px] shadow-sm  rounded-md"> {/* You can adjust the width here */}
                    
                </div>
            </div>
            <div className="flex items-center mr-4 focus:outline-none bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700 hover:text-white">
            <p className='text-sm font-medium text-center'> { user != '' ? user: ''}</p>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center mr-6 focus:outline-none bg-gray-200 rounded-md p-2 hover:bg-black hover:text-white"
            >
                <span className="mr-2">Logout</span>
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </header>
    );
};

export default Header;