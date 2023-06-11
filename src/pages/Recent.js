import React from 'react'
import  Header from "../components/Header";
import Content  from "../components/RecentContant";
import  Sidebar  from "../components/Sidebar";

export const Recent = () => {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <Header />
            <Sidebar />
            <Content />
        </div>
    );
}
