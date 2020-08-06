import React from 'react';
import Footer from '../components/footer'
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ManageTeam() {
    // Import result is the URL of your image
    return (
        <div className="mx-6 mt-6">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Players</h1>
                <div className="my-2">
                    <div className="flex items-center justify-between mt-2">
                        <h1>Player Name</h1>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <h1>Player Name</h1>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <h1>Player Name</h1>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                </div>
                <button className="text-blue-600 font-bold">+ Add New Player</button>
            </div>

            <div className="mb-6">
                <h1 className="text-xl font-bold">Stats</h1>
                <div className="my-2">
                    <div className="flex items-center justify-between mt-2">
                        <h1>Stat Name</h1>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <h1>Stat Name</h1>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <h1>Stat Name</h1>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </div>
                </div>
                <button className="text-blue-600 font-bold">+ Add New Stat</button>
            </div>
            <Footer />
        </div> 
    );
}
export default ManageTeam;