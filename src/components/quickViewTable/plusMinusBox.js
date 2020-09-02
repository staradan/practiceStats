import React from 'react';
import { addStat } from '../../js/actions/index';
import { connect } from 'react-redux';
import firebase from 'firebase';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}


const PlusMinusBox = ({ playerName, statName, rowBackgroundColor, addStat, stats }) => {
    const minusColor = (statName === 'Competitive' || statName === 'Diving') ? 'text-orange-400' : 'text-red-500';
    const positiveStats = () => {
        let numPositiveStats = 0;
        stats.map(x => {
            if(x.stat.statName === statName && x.stat.playerName === playerName && x.stat.isPositive){
                numPositiveStats++;
            }
        });

        return numPositiveStats;
    }
    const negativeStats = () => {
        let numPositiveStats = 0;
        stats.map(x => {
            if(x.stat.statName === statName && x.stat.playerName === playerName && !x.stat.isPositive){
                numPositiveStats++;
            }
        });

        return numPositiveStats;
    }
    positiveStats();
    if (statName != 'Ball On Ground') {
        return (
            <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                <button className="inline w-6/12 flex-none px-2 py-4 border-r">
                    <h1 className="text-blue-500">{positiveStats()}</h1>
                </button>
                <button className="inline w-6/12 flex-none px-2 py-4">
                    <h1 className={minusColor}>{negativeStats()}</h1>
                </button>
            </div>
        );
    } else {
        return (
            <div className={"w-1/12 flex-none text-gray-700 border-gray-500 border-r text-center " + rowBackgroundColor}>
                <button className="inline w-full flex-none py-4" >
                    <h1 className="text-red-400">{negativeStats()}</h1>
                </button>
            </div>
        );
    }
}

const AddStatBox = connect(mapStateToProps)(PlusMinusBox);

export default AddStatBox;