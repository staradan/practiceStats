import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { deleteStat } from '../js/actions/index';
import axios from 'axios';
import firebase from 'firebase';

function mapDispatchToProps(dispatch) {
    return {
        deleteStat: stat => dispatch(deleteStat(stat))
    };
}

function deleteStatFromDatabase(statID) {
    const db = firebase.firestore();

    var jobskill_query = db.collection('stats').where('statID', '==', statID);
    jobskill_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
}

const StatHistoryRow = (props) => {
    let statTextColor = props.isPositiveStat ? 'text-blue-400' : 'text-red-400';
    let statDecorator = props.isPositiveStat ? '+ ' : '- ';
    return (
        <div className="w-full rounded-sm flex pl-2 pr-4 border-gray-400 border-b py-1 bg-white">
            <div className="w-2/5 rounded-sm text-left pr-2 font-semibold text-sm text-gray-700 overflow-x-hidden whitespace-no-wrap">{props.playerName}</div>
            <div className={"w-2/5 text-left ml-2 pr-2 overflow-x-hidden font-semibold text-sm whitespace-no-wrap text-center " + statTextColor}>{statDecorator + props.playerStatistic}</div>
            <button className="w-1/5 rounded-sm text-center" onClick={() => {
                props.deleteStat(props.statID);
                deleteStatFromDatabase(props.statID);
            }}>
                <FontAwesomeIcon icon={faUndo} />
            </button>
        </div>
    );
}

const HistoryRow = connect(
    null,
    mapDispatchToProps
)(StatHistoryRow);

export default HistoryRow;