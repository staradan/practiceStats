import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { deleteStat } from '../js/actions/index';
import axios from 'axios';

function mapDispatchToProps(dispatch) {
    return {
        deleteStat: stat => dispatch(deleteStat(stat))
    };
}

function deleteStatFromDatabase(statID) {
    //do the axios delete
    console.log('got here');
    axios.delete('http://localhost:3000/stats/' + statID)
        .then(response => { console.log(response.data) })
        .catch(response => { console.log('error', response) });
}

const StatHistoryRow = ({ isPositiveStat, statID, playerName, playerStatistic, deleteStat }) => {
    let statTextColor = isPositiveStat ? 'text-blue-400' : 'text-red-400';
    let statDecorator = isPositiveStat ? '+ ' : '- ';
    return (
        <div className="w-full rounded-sm flex pl-2 pr-4 border-gray-600 border-b mb-1 py-1">
            <div className="w-2/5 rounded-sm text-left pr-2 font-semibold text-sm text-gray-700 overflow-x-hidden whitespace-no-wrap">{playerName}</div>
            <div className={"w-2/5 text-left ml-2 pr-2 overflow-x-hidden font-semibold text-sm whitespace-no-wrap text-center " + statTextColor}>{statDecorator + playerStatistic}</div>
            <button className="w-1/5 rounded-sm text-center">
                <FontAwesomeIcon
                    icon={faUndo}
                    onClick={() => {
                        deleteStat(statID);
                        deleteStatFromDatabase(statID);
                    }}
                />
            </button>
        </div>
    );
}

const HistoryRow = connect(
    null,
    mapDispatchToProps
)(StatHistoryRow);

export default HistoryRow;