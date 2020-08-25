import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { addPlayer } from '../js/actions/index';
import { connect } from 'react-redux';
import firebase from 'firebase';


function mapDispatchToProps(dispatch) {
    return {
        addPlayer: player => dispatch(addPlayer(player))
    };
}

const AddPlayerForm = ({ addPlayer }) => {

    const [playerName, setName] = useState("");

    const handleSubmit = (evt) => {
        const db = firebase.firestore();
        evt.preventDefault();

        let player = {
            playerName: playerName,
            teamID: 1,
            playerID: Math.random() * 1000,
        };
        db.collection('players').add(player)
            .then(function () {
                addPlayer({ player });
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

        setName('');
    }

    return (

        <div className="flex items-center bg-white rounded shadow my-2 p-4">
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    <FontAwesomeIcon icon={faPlus} className="text-green-400 mr-3" />
                </button>
                <input
                    className="border-b"
                    placeholder="Enter full name here"
                    type="text"
                    value={playerName}
                    onChange={e => setName(e.target.value)}
                />
            </form>
        </div>


        // <div className="mb-6 mt-4">
        //     <p className="text-sm font-bold mb-1">Add A New Player</p>
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             className="border-b"
        //             placeholder="Enter full name here"
        //             type="text"
        //             value={playerName}
        //             onChange={e => setName(e.target.value)}
        //         />
        //         <button className="text-blue-600 font-bold ml-3" type="submit">Add</button>
        //     </form>
        // </div>
    );
}

const Form = connect(
    null,
    mapDispatchToProps
)(AddPlayerForm);

export default Form;