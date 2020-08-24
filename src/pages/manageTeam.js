import React, { useState } from "react";
import Footer from '../components/footer'
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddPlayerForm from '../components/addPlayerForm';
import ManageTeamInfoPoint from '../components/manageTeamInfoPoint';
import ManageTeamList from '../components/manageTeamList';



const ManageTeam = () => {
    return (
        <div className="mx-6 mt-6">
            <ManageTeamList />
            <AddPlayerForm />

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
                    <ManageTeamInfoPoint name="poop" />
                </div>
                <button className="text-blue-600 font-bold">+ Add New Stat</button>
            </div>
            <Footer />
        </div>
    );
}

export default ManageTeam;