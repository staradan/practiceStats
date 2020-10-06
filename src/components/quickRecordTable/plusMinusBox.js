import React, { useContext } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from '../../firebase';


const PlusMinusBox = ({ playerName, statName, rowBackgroundColor }) => {
    const { firebase, addStat } = useContext(FirebaseContext);
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'text-orange-400' : 'text-red-500';

    const addNewStat = async (playerName, statName, isPositive) => {
        let firebaseTimestamp = firebase.getTimestamp(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        const stat = {
            statName: statName,
            isPositive: isPositive,
            playerName: playerName,
            createdAt: firebaseTimestamp,
            statID: Math.random() * 1000,
        }
        await firebase.db.collection('allStats').add(stat)
            .then(function (docRef) {
                addStat(stat);
            });
    }

    if (statName !== 'Ball On Ground') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-28 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                        <button className="inline w-6/12 flex-none px-2 py-4 border-r" onClick={() => { addNewStat(playerName, statName, true) }}>
                            <FontAwesomeIcon icon={faPlus} className={"text-blue-500"} />
                        </button>
                        <button className="inline w-6/12 flex-none px-2 py-4" onClick={() => { addNewStat(playerName, statName, false) }}>
                            <FontAwesomeIcon icon={faMinus} className={minusColor} />
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    } else {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-28 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                        <button className="inline w-full flex-none py-4" onClick={() => { addNewStat(playerName, statName, false) }}>
                            <FontAwesomeIcon icon={faPlus} className={"text-red-400"} />
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    }
}

export default PlusMinusBox;