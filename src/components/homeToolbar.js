import React from 'react';
import logo from '../assets/unl-logo.jpg';

function HomeToolbar() {
    return (
        <div className="w-screen p-4 flex items-center justify-start">
            <img src={logo} alt="Logo" className="w-20" />
            <p className="text-xl uppercase font-black">Baseball</p>
        </div>
    );
}
export default HomeToolbar;