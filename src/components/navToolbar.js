import React from 'react';
import logo from '../assets/unl-logo.png';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function NavToolbar() {
    return (
        <div className="w-screen px-4 py-3 flex items-center justify-between">
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="2x" /></Link>
            <img src={logo} alt="Logo" className="w-12" />
        </div>
    );
}
export default NavToolbar;