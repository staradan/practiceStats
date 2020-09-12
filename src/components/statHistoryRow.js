import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FirebaseContext } from '../firebase';
import * as Cruncher from '../numberCrunchers/index'

const StatHistoryRow = (props) => {
    const { deleteStat, firebase } = useContext(FirebaseContext);

    function deleteStatFromDatabase(statID) {
        let day = new Date();
        let dayString = Cruncher.dateToString(day);
        var jobskill_query = firebase.db.collection(dayString).where('statID', '==', statID);
        jobskill_query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
            deleteStat(props);
        });
    }

    let statTextColor = props.isPositiveStat ? 'text-blue-400' : 'text-red-400';
    let statDecorator = props.isPositiveStat ? '+ ' : '- ';
    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="w-full rounded-sm flex pl-2 pr-4 border-gray-400 border-b py-1 bg-white">
                    <div className="w-2/5 rounded-sm text-left pr-2 font-semibold text-sm text-gray-700 overflow-x-hidden whitespace-no-wrap">{props.playerName}</div>
                    <div className={"w-2/5 text-left ml-2 pr-2 overflow-x-hidden font-semibold text-sm whitespace-no-wrap text-center " + statTextColor}>{statDecorator + props.playerStatistic}</div>
                    <button className="w-1/5 rounded-sm text-center" onClick={() => {
                        deleteStatFromDatabase(props.statID);
                    }}>
                        <FontAwesomeIcon icon={faUndo} />
                    </button>
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default StatHistoryRow;