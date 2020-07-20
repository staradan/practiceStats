import React from 'react';
import logo from '../assets/unl-logo.jpg';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function HomeToolbar() {
    return (
        <div className="mb-3 w-screen px-4 py-3 flex items-center justify-between">
            <Link to="/"><img src={logo} alt="Logo" className="w-10" /></Link>
            <button>
                <div className="pt-2">
                    <FontAwesomeIcon icon={faBars} className="inline" size="2x" />
                </div>
            </button>
        </div>
    );
}
export default HomeToolbar;