import React, { useState } from "react";
import axios from 'axios';
import { addPlayer } from '../js/actions/index';
import { connect } from 'react-redux';


function mapDispatchToProps(dispatch) {
    return {
        addPlayer: player => dispatch(addPlayer(player))
    };
}

const AddPlayerForm = ({ addPlayer }) => {

    const [name, setName] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let player = {
            name: name,
            teamID: 1,
        };
        axios.post('http://localhost:3000/players/add', player)
            .then(function (response) {
                console.log(response);
                addPlayer({ player })
            }).catch(() => {
                console.log('uh oh!');
            })

        setName('');
    }

    return (
        <div className="mb-6 mt-4">
            <p className="text-sm font-bold mb-1">Add A New Player</p>
            <form onSubmit={handleSubmit}>
                <input
                    className="border-b"
                    placeholder="Enter full name here"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="text-blue-600 font-bold ml-3" type="submit">Add</button>
            </form>
        </div>
    );
}

const Form = connect(
    null,
    mapDispatchToProps
)(AddPlayerForm);

export default Form;