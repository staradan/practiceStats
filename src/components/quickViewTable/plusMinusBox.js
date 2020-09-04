import React, { useContext } from 'react';
import { addStat } from '../../js/actions/index';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { FirebaseContext } from '../../firebase';
import * as Cruncher from '../../numberCrunchers';

// const mapStateToProps = state => {
//     return {
//         players: state.players,
//         stats: state.stats,
//         statCategories: state.statCategories,
//     }
// }


const PlusMinusBox = ({ playerName, statName, rowBackgroundColor }) => {
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'font-bold text-orange-400' : 'font-bold text-red-500';

    const { stats, dateShown } = useContext(FirebaseContext);

    const posAndNegStats = () => {
        let numPositiveStats = 0;
        let numNegativeStats = 0;
        stats.map(x => {
            let statDay = new Date(x.createdAt.seconds * 1000);
            if (x.statName === statName && x.playerName === playerName && Cruncher.datesAreInRange(statDay, dateShown, 'day')) {
                if (x.isPositive) {
                    numPositiveStats++;
                } else {
                    numNegativeStats++;
                }
            }
        });

        return [numPositiveStats, numNegativeStats];
    }
    // const negativeStats = () => {
    //     let numPositiveStats = 0;
    //     stats.map(x => {
    //         if (x.statName === statName && x.playerName === playerName && !x.isPositive) {
    //             numPositiveStats++;
    //         }
    //     });

    //     return numPositiveStats;
    // }
    if (statName != 'Ball On Ground') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                        <button className="inline w-6/12 flex-none px-2 py-4 border-r">
                            <h1 className={posAndNegStats()[0] > 0 ? 'font-bold text-blue-500' : 'text-gray-500'}>{posAndNegStats()[0]}</h1>
                        </button>
                        <button className="inline w-6/12 flex-none px-2 py-4">
                            <h1 className={posAndNegStats()[1] > 0 ? minusColor : 'text-gray-500'}>{posAndNegStats()[1]}</h1>
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
                        <button className="inline w-full flex-none py-4" >
                            <h1 className={posAndNegStats()[1] > 0 ? 'font-bold text-red-400' : 'text-gray-500'}>{posAndNegStats()[1]}</h1>
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    }
}

//const AddStatBox = connect(mapStateToProps)(PlusMinusBox);

export default PlusMinusBox;