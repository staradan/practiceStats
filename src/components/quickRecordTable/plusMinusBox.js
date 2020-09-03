import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addStat } from '../../js/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from 'firebase';

function mapDispatchToProps(dispatch) {
    return {
        addStat: stat => dispatch(addStat(stat))
    };
}

const addNewStat = (name, statName, isPositive, addStat, firebase) => {
    const db = firebase.firestore();
    const stat = {
        statName: statName,
        isPositive: isPositive,
        playerName: name,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        statID: Math.random() * 1000,
    }


    // db.collection('stats').add(stat)
    //     .then(function (docRef) {
    //         stat.documentID = docRef.id;
    //         console.log('added!');
    //         addStat({ stat });
    //     })
    //     .catch(function (error) {
    //         alert('Error. Stat was not saved');
    //         console.error("Error adding document: ", error);
    //     });
}

const PlusMinusBox = ({ playerName, statName, rowBackgroundColor, addStat, firebase }) => {
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'text-orange-400' : 'text-red-500';

    if (statName != 'Ball On Ground') {
        return (
            <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                <button className="inline w-6/12 flex-none px-2 py-4 border-r" onClick={() => { addNewStat(playerName, statName, true, addStat) }}>
                    <FontAwesomeIcon icon={faPlus} className={"text-blue-500"} />
                </button>
                <button className="inline w-6/12 flex-none px-2 py-4" onClick={() => { addNewStat(playerName, statName, false, addStat, firebase) }}>
                    <FontAwesomeIcon icon={faMinus} className={minusColor} />
                </button>
            </div>
        );
    } else {
        return (
            <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                <button className="inline w-full flex-none py-4" onClick={() => { addNewStat(playerName, statName, false, addStat, firebase) }}>
                    <FontAwesomeIcon icon={faPlus} className={"text-red-400"} />
                </button>
            </div>
        );
    }
}

const AddStatBox = connect(
    null,
    mapDispatchToProps
)(PlusMinusBox);

export default AddStatBox;