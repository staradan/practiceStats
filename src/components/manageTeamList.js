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
                {players.map((player, index) => (
                    <ManageTeamInfoPoint name={player.player.playerName} playerID={player.player.playerID} key={index} />
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <div>No Players! Add a player to get started</div>
            </div>
        )
    }
}


const View = connect(mapStateToProps)(ManageTeamListView);

export default View;