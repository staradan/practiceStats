import React from "react";
import Footer from '../components/footer'
import AddPlayerForm from '../components/addPlayerForm';
import ManageTeamList from '../components/manageTeamList';
import { Link } from 'react-router-dom';



const ManageTeam = () => {
    return (
        <div className="mx-6 mt-6">
            <h1 className="text-lg font-bold">Players</h1>
            <ManageTeamList />
            <AddPlayerForm />
            <Link to="/take" className="font-bold text-blue-600"><h1>Go Back To Taking Stats</h1></Link>
            <Footer />
        </div>
    );
}

export default ManageTeam;