import React from "react";
import ManageTeamInfoPoint from '../components/manageTeamInfoPoint';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        players: state.players,
    }
}

const ManageTeamListView = ({ players }) => {
    if (players != null) {
        return (
            <div>
                <h1 className="text-xl font-bold">Players</h1>
                {players.map((player, index) => (
                    <ManageTeamInfoPoint name={player.player.name} key={index} />
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="text-xl font-bold">Players</h1>
                <div>No Players! Add a player to get started</div>
            </div>
        )
    }
}


const View = connect(mapStateToProps)(ManageTeamListView);

export default View;