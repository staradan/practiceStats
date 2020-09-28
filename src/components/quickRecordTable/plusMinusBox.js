import React, { useContext } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from '../../firebase';


const PlusMinusBox = ({ playerName, statName, rowBackgroundColor }) => {

    // const { addAdditionalDay, firebase, players } = useContext(FirebaseContext);


    // const addNewStat = (name, statName, isPositive) => {
    //     let dayString = Cruncher.dateToString(new Date());
    //     const stat = {
    //         statName: statName,
    //         isPositive: isPositive,
    //         playerName: name,
    //         createdAt: firebase.getTimestamp(new Date()),
    //         statID: Math.random() * 1000,
    //     }
    //     firebase.db.collection(dayString).add(stat)
    //         .then(function (docRef) {
    //             stat.documentID = docRef.id;
    //             //this adds it to the stat history view
    //             addAdditionalDay(stat);
    //             players.forEach(player => {
    //                 if (player.playerName === stat.playerName) {
    //                     if (stat.statName === 'Diving') {  //get neutrals
    //                         player.neutralStats.push(stat);
    //                     } else if (stat.statName === 'Competitive' && !stat.isPositive) {
    //                         player.neutralStats.push(stat);
    //                     } else if (stat.isPositive) {
    //                         player.positiveStats.push(stat);
    //                     } else {   //get negatives
    //                         player.negativeStats.push(stat);
    //                     }
    //                 }
    //             });
    //         })
    //         .catch(function (error) {
    //             alert('Error. Stat was not saved');
    //             console.error("Error adding document: ", error);
    //         });
    // }
    const { addStatToDatabase, firebase, addStat } = useContext(FirebaseContext);
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'text-orange-400' : 'text-red-500';

    const addNewStat = (playerName, statName, isPositive) => {
        const stat = {
            statName: statName,
            isPositive: isPositive,
            playerName: playerName,
            createdAt: firebase.getTimestamp(new Date()),
            statID: Math.random() * 1000,
        }
        firebase.db.collection('allStats').add(stat)
            .then(function (docRef) {
                addStat(stat);
            });
        console.log('yep', stat);
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