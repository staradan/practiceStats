import React, { useContext } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addStat } from '../../js/actions/index';
import { connect } from 'react-redux';
import { FirebaseContext } from '../../firebase';
import * as Cruncher from '../../numberCrunchers/index';


function mapDispatchToProps(dispatch) {
    return {
        addStat: stat => dispatch(addStat(stat))
    };
}


const PlusMinusBox = ({ playerName, statName, rowBackgroundColor }) => {
    const { addAdditionalDay, firebase } = useContext(FirebaseContext);
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'text-orange-400' : 'text-red-500';


    const addNewStat = (name, statName, isPositive, addStat) => {
        let dayString = Cruncher.dateToString(new Date());
        const stat = {
            statName: statName,
            isPositive: isPositive,
            playerName: name,
            createdAt: firebase.getTimestamp(new Date()),
            statID: Math.random() * 1000,
        }
        firebase.db.collection(dayString).add(stat)
            .then(function (docRef) {
                stat.documentID = docRef.id;
                addAdditionalDay(stat);
            })
            .catch(function (error) {
                alert('Error. Stat was not saved');
                console.error("Error adding document: ", error);
            });
    }


    if (statName !== 'Ball On Ground') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                        <button className="inline w-6/12 flex-none px-2 py-4 border-r" onClick={() => { addNewStat(playerName, statName, true, addStat) }}>
                            <FontAwesomeIcon icon={faPlus} className={"text-blue-500"} />
                        </button>
                        <button className="inline w-6/12 flex-none px-2 py-4" onClick={() => { addNewStat(playerName, statName, false, addStat) }}>
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
                    <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                        <button className="inline w-full flex-none py-4" onClick={() => { addNewStat(playerName, statName, false, addStat) }}>
                            <FontAwesomeIcon icon={faPlus} className={"text-red-400"} />
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    }
}

const AddStatBox = connect(
    null,
    mapDispatchToProps
)(PlusMinusBox);

export default AddStatBox;