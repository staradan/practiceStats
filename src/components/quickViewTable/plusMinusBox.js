import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';
import * as Cruncher from '../../numberCrunchers';

const PlusMinusBox = ({ player, statName, rowBackgroundColor }) => {
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'font-bold text-orange-400' : 'font-bold text-red-500';

    const { days, dateShown } = useContext(FirebaseContext);



    const posAndNegStats = () => {
        let numPositiveStats = 0;
        let numNegativeStats = 0;

        if (days) {
            days.map(x => {
                let statDay = new Date(x.createdAt.seconds * 1000);
                if (x.statName === statName && x.playerName === player.playerName && Cruncher.datesAreInRange(statDay, dateShown, 'day')) {
                    if (x.isPositive) {
                        numPositiveStats++;
                    } else {
                        numNegativeStats++;
                    }
                }
                return null; //get error otherwise
            });
        }

        return [numPositiveStats, numNegativeStats];
    }


    const getOverallPercentage = () => {
        return player.positiveStats.length / (player.positiveStats.length + player.negativeStats.length + player.neutralStats.length);
    }


    //this shit can be refactored to get the player's stats
    if (statName === 'Overall') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r border-gray-800 text-center " + rowBackgroundColor}>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={player.positiveStats.length > 0 ? 'font-bold text-blue-500' : 'text-gray-500'}>{player.positiveStats.length}</h1>
                        </button>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={player.negativeStats.length > 0 ? minusColor : 'text-gray-500'}>{player.negativeStats.length}</h1>
                        </button>
                        <button className="inline w-5/12 flex-none px-2 py-4">
                            <h1 className={player.successPercentage > 98 ? 'font-bold text-yellow-500' : 'font-bold text-gray-600'}>
                                {player.successPercentage}%
                            </h1>
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    } else if (statName !== 'Ball On Ground') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r border-gray-800 text-center " + rowBackgroundColor}>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={posAndNegStats()[0] > 0 ? 'font-bold text-blue-500' : 'text-gray-500'}>{posAndNegStats()[0]}</h1>
                        </button>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={posAndNegStats()[1] > 0 ? minusColor : 'text-gray-500'}>{posAndNegStats()[1]}</h1>
                        </button>
                        <button className="inline w-5/12 flex-none px-2 py-4">
                            <h1 className={(posAndNegStats()[0] > 0 || posAndNegStats()[1] > 0) ? 'font-bold text-gray-600' : 'text-gray-500'}>
                                {
                                    (posAndNegStats()[0] > 0 || posAndNegStats()[1] > 0) ? '' + ((posAndNegStats()[0] / (posAndNegStats()[0] + posAndNegStats()[1])).toFixed(2) * 100) + '%' : '-'
                                }
                            </h1>
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    }
    else {
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

export default PlusMinusBox;