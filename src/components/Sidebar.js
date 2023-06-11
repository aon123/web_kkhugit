import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';




const Sidebar = () => {
    

    return (
        <aside className="w-64 fixed top-20 shadow-md left-0 bottom-0  bg-[#FCFCFC] text-black flex flex-col z-0">
            <nav className="flex-grow">
                <ul>
                    <Link to="/">
                    <li className=" pt-6 px-4">
                        <div className="w-full shadow-sm h-12 rounded-lg bg-gray-200 text-center justify-center flex items-center hover:bg-black hover:text-white">
                            <i className="fas fa-home mr-2"></i>
                            <p className="font-semibold">Home</p>
                        </div>
                    </li>
                    </Link>
                    <Link to='/recent'>
                    <li className="py-2 pt-4 px-4">
                        <div className="w-full shadow-sm h-12 rounded-lg bg-gray-200 text-center justify-center flex items-center hover:bg-black hover:text-white">
                            <i className="fas fa-history mr-2"></i>
                            <p className="font-semibold">Recent</p>
                        </div>
                    </li>
                    </Link>
                    <Link to='/favorites'>
                    <li className="py-2 pt-2 px-4">
                        <div className="w-full shadow-sm h-12 rounded-lg bg-gray-200 text-center justify-center flex items-center hover:bg-black hover:text-white">
                            <i className="fas fa-star mr-2"></i>
                            <p className="font-semibold">Favorites</p>
                        </div>
                    </li>
                    </Link>
                    <Link to='/view'>
                    <li className="py-2 pt-2 px-4">
                        <div className="w-full shadow-sm h-12 rounded-lg bg-gray-200 text-center justify-center flex items-center hover:bg-black hover:text-white">
                            <i className="fas fa-eye mr-2"></i>
                            <p className="font-semibold">Most Viewed</p>
                        </div>
                    </li>
                    </Link>
                    <Link to='/shared'>
                    <li className="py-2 pt-2 px-4">
                        <div className="w-full shadow-sm h-12 rounded-lg bg-gray-200 text-center justify-center flex items-center hover:bg-black hover:text-white">
                            <i className="fas fa-share mr-2"></i>
                            <p className="font-semibold">Shared Files</p>
                        </div>
                    </li>
                    </Link>
                </ul>
            </nav>
            <div className="py-2 px-4 pb-6">
                <Link to='/trash'>
                <div className="w-full shadow-sm h-12 rounded-lg bg-gray-200 text-center justify-center flex items-center hover:bg-red-600 hover:text-white">
                    <i className="fas fa-trash mr-2"></i>
                    <p className="font-semibold">Trash</p>
                </div>
                </Link>
            </div>
        </aside>

    );
};

export default Sidebar;

