import React from 'react'
import  Header from "../components/Header";
import Content  from "../components/FavoritesContainer";
import  Sidebar  from "../components/Sidebar";

export const Favorites = () => {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <Header />
            <Sidebar />
            <Content />
        </div>
    );
}
