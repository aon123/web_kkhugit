import React from 'react'
import  Header from "../components/Header";
import Content  from "../components/MostViewContainer";
import  Sidebar  from "../components/Sidebar";

export const MostView = () => {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <Header />
            <Sidebar />
            <Content />
        </div>
    );
}
