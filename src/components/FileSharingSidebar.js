import React, { useState } from 'react';
import axios from 'axios';

export const FileSharingSidebar = ({ file, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleShare = () => {
    // Replace with the URL of your API endpoint
    const apiUrl = 'http://13.125.141.67/api/v1/files/file/share/';
    const token = localStorage.getItem('accessToken');
          console.log(token)
  
        // Set the authorization header with the access token
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
    axios.post(apiUrl, {
      email: email,
      id: file.id,
    }, config)
    .then((response) => {
      setMessage('File successfully shared!');
      setTimeout(onClose, 2000); // Close sidebar after 2 seconds
    })
    .catch((error) => {
      setMessage('No user with this email exists.');
    });
  };

  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-slate-50 shadow-md">
        <div className="flex mt-20 justify-between items-center p-4">
            <h2 className="font-semibold text-lg text-black">Share File</h2>
            <button onClick={onClose} className="text-white w-8 bg-red-600 p-1 rounded-lg hover:text-gray-800">
                <i className="fas fa-times"></i>
            </button>
        </div>
        <div className='mt-8 ml-4 mr-4 flex flex-col'>
        
        <input
        type="email"
        className='border border-gray-300 rounded-md p-2'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
      />
      <button className='p-2 mt-2 bg-gray-200 rounded-lg text-black hover:bg-black hover:text-white' onClick={handleShare}>Share</button>
      {message && <div className="text-red-500 font-semibold text-lg">{message}</div>}
        </div>
    </div>
  );
};


