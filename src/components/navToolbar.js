import React from 'react';
import logo from '../assets/unl-logo.jpg';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function HomeToolbar() {
    return (
        <div className="mb-3 w-screen px-4 py-3 flex items-center justify-between">
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="2x" /></Link>
            <img src={logo} alt="Logo" className="w-12" />
        </div>
    );
}
export default HomeToolbar;