import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addStat } from '../../js/actions/index';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        addStat: stat => dispatch(addStat(stat))
    };
}

const addNewStat = (playerName, statName, isPositive, addStat) => {
    const stat = {
        playerName: playerName,
        statName: statName,
        isPositive: isPositive,
        time: '',
        statId: new Date().getUTCMilliseconds(),
    }
    addStat({ stat });
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