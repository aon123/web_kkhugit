
import  Header from "../components/Header";
import Content  from "../components/MainContents";
import  Sidebar  from "../components/Sidebar";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      history('/login');
    }
  }, [history]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
     <Header handleSearch={handleSearch} />
      <Sidebar />
      <Content searchTerm={searchTerm} />
    </div>
  );
};