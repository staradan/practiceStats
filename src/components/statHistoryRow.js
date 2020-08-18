import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { deleteStat } from '../js/actions/index';

function mapDispatchToProps(dispatch) {
    return {
        deleteStat: stat => dispatch(deleteStat(stat))
    };
}

const StatHistoryRow = ({ isPositiveStat, statId, playerName, playerStatistic, deleteStat }) => {
    let statTextColor = isPositiveStat ? 'text-blue-400' : 'text-red-400';
    let statDecorator = isPositiveStat ? '+ ' : '- ';
    return (
        <div className="w-full rounded-sm flex pl-2 pr-4 border-gray-600 border-b mb-1 py-1">
            <div className="w-2/5 rounded-sm text-left pr-2 font-semibold text-sm text-gray-700 overflow-x-hidden whitespace-no-wrap">{playerName}</div>
            <div className={"w-2/5 text-left ml-2 pr-2 overflow-x-hidden font-semibold text-sm whitespace-no-wrap text-center " + statTextColor}>{statDecorator + playerStatistic}</div>
            <button className="w-1/5 rounded-sm text-center">
                <FontAwesomeIcon
                    icon={faUndo}
                    onClick={() => { deleteStat(statId); }}
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