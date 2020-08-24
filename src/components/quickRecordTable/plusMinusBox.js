import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addStat } from '../../js/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';


function mapDispatchToProps(dispatch) {
    return {
        addStat: stat => dispatch(addStat(stat))
    };
}

const addNewStat = (name, statName, isPositive, addStat) => {
    console.log('name', parseInt(new Date().getUTCMilliseconds()), typeof parseInt(new Date().getUTCMilliseconds()));

    const stat = {
        statName: statName,
        isPositive: isPositive,
        playerName: name,
        statID: parseInt(new Date().getUTCMilliseconds()),
    }
    //do a post with axios
    axios.post('http://localhost:3000/stats/add', stat)
        .then(function (response) {
            addStat({ stat });
            console.log(response);
        }).catch(() => {
            console.log('uh oh!');
        })
}

const PlusMinusBox = ({ playerName, statName, rowBackgroundColor, addStat }) => {
    return (
        <div className={"w-16 flex-none text-gray-700 border-gray-500 border-r text-center py-2 " + rowBackgroundColor}>
            <button className="inline w-4/12 flex-none" onClick={() => { addNewStat(playerName, statName, true, addStat) }}>
                <FontAwesomeIcon icon={faPlus} className="text-blue-500" />
            </button>
            <button className="inline w-4/12 flex-none" onClick={() => { addNewStat(playerName, statName, false, addStat) }}>
                <FontAwesomeIcon icon={faMinus} className="text-red-500" />
            </button>
        </div>
    );
}

const AddStatBox = connect(
    null,
    mapDispatchToProps
)(PlusMinusBox);

export default AddStatBox;