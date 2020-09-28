import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';

const PlusMinusBox = ({ player, statName, rowBackgroundColor }) => {
    const { stats } = useContext(FirebaseContext);
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'font-bold text-orange-400' : 'font-bold text-red-500';
    //calculate positives and negatives
    const categoryPosAndNegStats = () => {
        let categoryPositiveStats = 0;
        let categoryNegativeStats = 0;
        let totalPositive = 0;
        let totalNegative = 0;

        if (stats) {
            stats.map(x => {
                if (x.playerName === player.playerName) {
                    if (x.isPositive) {
                        totalPositive++;
                    } else {
                        totalNegative++;
                    }
                    if (x.statName === statName) {
                        if (x.isPositive) {
                            categoryPositiveStats++;
                        } else {
                            categoryNegativeStats++;
                        }
                    }
                }
                return null; //get error otherwise
            });
        }

        return [categoryPositiveStats, categoryNegativeStats, totalPositive, totalNegative];
    }



    if (statName === 'Overall') {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className={"w-40 flex-none text-gray-700 border-gray-500 border-r border-gray-800 text-center " + rowBackgroundColor}>
                        <button className="inline w-4/12 flex-none px-2 py-4 border-r">
                            <h1 className={categoryPosAndNegStats()[2] > 0 ? 'font-bold text-blue-500' : 'text-gray-500'}>{categoryPosAndNegStats()[2]}</h1>
                        </button>
                        <button className="inline w-3/12 flex-none px-2 py-4 border-r">
                            <h1 className={categoryPosAndNegStats()[3] > 0 ? minusColor : 'text-gray-500'}>{categoryPosAndNegStats()[3]}</h1>
                        </button>
                        <button className="inline w-5/12 flex-none px-2 py-4">
                            <h1 className={(categoryPosAndNegStats()[0] > 0 || categoryPosAndNegStats()[1] > 0) > 98.00 ? 'font-bold text-yellow-500' : 'font-bold text-gray-600'}>
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