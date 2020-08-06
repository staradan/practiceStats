import React from 'react';
import logo from '../assets/unl-logo.jpg';

function HomeToolbar() {
    return (
        <div className="w-screen p-4 flex items-center justify-start border-b border-gray-400">
            <img src={logo} alt="Logo" className="w-10"/>
            <p className="text-xl uppercase font-black">Baseball</p>
        </div>
    );
}
export default HomeToolbar;