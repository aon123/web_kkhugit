import React from 'react'
import  Header from "../components/Header";
import Content  from "../components/SharedContent";
import  Sidebar  from "../components/Sidebar";

export const Shared = () => {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <Header />
            <Sidebar />
            <Content />
        </div>
    );
}
