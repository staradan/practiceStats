import React from 'react';
import { Link } from 'react-router-dom';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowsAltV } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Footer() {
    return (
        <div className="w-full h-16">
            <section id="bottom-navigation" className="xl:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                <div id="tabs" className="flex justify-between">
                    <Link to="/" className="w-full focus:text-red-500 hover:text-red-500 justify-center inline-block text-center pt-2 pb-1">
                        <div className="inline-block mb-1">
                            <FontAwesomeIcon icon={faHome} />
                        </div>
                        <span className="tab tab-home block text-xs">Home</span>
                    </Link>
                    <Link to="/take" className="w-full focus:text-red-500 hover:text-red-500 justify-center inline-block text-center pt-2 pb-1">
                        <div className="inline-block mb-1">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </div>
                        <span className="tab tab-explore block text-xs">Take Stats</span>
                    </Link>
                    <Link to="/view" className="w-full focus:text-red-500 hover:text-red-500 justify-center inline-block text-center pt-2 pb-1">
                        <div className="inline-block mb-1">
                            <FontAwesomeIcon icon={faArrowsAltV} />
                        </div>
                        <span className="tab tab-whishlist block text-xs">Leaders</span>
                    </Link>
                    <Link to="/manage" className="w-full focus:text-red-500 hover:text-red-500 justify-center inline-block text-center pt-2 pb-1">
                        <div className="inline-block mb-1">
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </div>
                        <span className="tab tab-account block text-xs">Manage</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Footer;