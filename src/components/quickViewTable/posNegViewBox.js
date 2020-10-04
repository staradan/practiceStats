import React, { useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const PlusMinusBox = ({ player, statName, rowBackgroundColor, num }) => {
    const { viewOnlyStats } = useContext(FirebaseContext);
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'font-bold text-orange-400' : 'font-bold text-red-500';
    const playerStats = viewOnlyStats[player];

    //calculate positives and negatives
    const categoryPosAndNegStats = () => {
        let categoryPositiveStats = 0;
        let categoryNegativeStats = 0;
        let totalPositive = 0;
        let totalNegative = 0;

        //get category positive
        if (playerStats) {
            playerStats.positive.forEach(x => {
                if (x.statName === statName) {
                    categoryPositiveStats++;
                }
            });
            playerStats.negative.forEach(x => {
                if (x.statName === statName) {
                    categoryNegativeStats++;
                }
            });
            totalPositive = playerStats.positive.length;
            totalNegative = playerStats.adjustedNegative.length;
        }

        return [categoryPositiveStats, categoryNegativeStats, totalPositive, totalNegative];
    }



    if (statName === 'Overall') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-40 flex-none text-gray-700 border-gray-500 border-r border-gray-600 text-center " + rowBackgroundColor}>
                        <button className="inline w-4/12 flex-none px-2 py-4 border-r">
                            <h1 className={categoryPosAndNegStats()[2] > 0 ? 'font-bold text-blue-500' : 'text-gray-500'}>{categoryPosAndNegStats()[2]}</h1>
                        </button>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={categoryPosAndNegStats()[3] > 0 ? minusColor : 'text-gray-500'}>{categoryPosAndNegStats()[3]}</h1>
                        </button>
                        <button className="inline w-5/12 flex-none px-2 py-4">
                            <h1 className={num === 0 ? 'font-bold text-yellow-600' : 'font-bold text-gray-600'}>
                                {
                                    (categoryPosAndNegStats()[2] > 0 || categoryPosAndNegStats()[3] > 0) ? '' + ((categoryPosAndNegStats()[2] / (categoryPosAndNegStats()[2] + categoryPosAndNegStats()[3])).toFixed(2) * 100) + '%' : '-'
                                }
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
                    <div className={"w-40 flex-none text-gray-700 border-gray-500 border-r border-gray-800 text-center " + rowBackgroundColor}>
                        <button className="inline w-4/12 flex-none px-2 py-4 border-r">
                            <h1 className={categoryPosAndNegStats()[0] > 0 ? 'font-bold text-blue-500' : 'text-gray-500'}>{categoryPosAndNegStats()[0]}</h1>
                        </button>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={categoryPosAndNegStats()[1] > 0 ? minusColor : 'text-gray-500'}>{categoryPosAndNegStats()[1]}</h1>
                        </button>
                        <button className="inline w-5/12 flex-none px-2 py-4">
                            <h1 className={(categoryPosAndNegStats()[0] > 0 || categoryPosAndNegStats()[1] > 0) ? 'font-bold text-gray-600' : 'text-gray-500'}>
                                {
                                    (categoryPosAndNegStats()[0] > 0 || categoryPosAndNegStats()[1] > 0) ? '' + ((categoryPosAndNegStats()[0] / (categoryPosAndNegStats()[0] + categoryPosAndNegStats()[1])).toFixed(2) * 100) + '%' : '-'
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
                    <div className={"w-40 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                        <button className="inline w-full flex-none py-4" >
                            <h1 className={categoryPosAndNegStats()[1] > 0 ? 'font-bold text-red-400' : 'text-gray-500'}>{categoryPosAndNegStats()[1]}</h1>
                        </button>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    }
}

export default PlusMinusBox;