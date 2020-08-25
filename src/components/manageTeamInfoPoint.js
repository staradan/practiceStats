import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { deletePlayer } from '../js/actions/index';
import firebase from 'firebase';

function mapDispatchToProps(dispatch) {
    return {
        deletePlayer: stat => dispatch(deletePlayer(stat))
    };
}


function deletePlayerFromDatabase(playerID) {
    const db = firebase.firestore();

    var player = db.collection('players').where('playerID', '==', playerID);
    player.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
}


const InfoPoint = ({ name, playerID, deletePlayer }) => {
    return (
        <div className="flex items-center bg-white rounded shadow my-2 p-4">
            <FontAwesomeIcon icon={faTimes} className="text-red-400 mr-3" onClick={() => {
                deletePlayer(playerID);
                deletePlayerFromDatabase(playerID)
            }} />
            <h1>{name}</h1>
        </div>
    );
}

const Point = connect(
    null,
    mapDispatchToProps
)(InfoPoint);

export default Point;