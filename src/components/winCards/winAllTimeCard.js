import { connect } from 'react-redux';
import React from 'react';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}

const WinYearCard = ({ players, stats, dateParam, dateText, statCategory }) => {
    let playerArray = [];
    let neutrals = ['Competitive', 'Diving'];
    players.map(x => {
        let posCounter = 0;
        let negCounter = 0;
        stats.map(y => {
            if (x.player.playerName === y.stat.playerName && y.stat.isPositive) {
                posCounter++;
            } else if (x.player.playerName === y.stat.playerName && (!y.stat.isPositive)) {
                negCounter++;
            }
        });
        let playerObject = {
            playerName: x.player.playerName,
            totalPositives: posCounter,
            totalNegatives: negCounter,
            totalChances: posCounter + negCounter,
            totalPercent: Math.round(((posCounter / (posCounter + negCounter)) * 100) * 10) / 10
        }
        playerArray.push(playerObject);
    });

    playerArray.sort((a, b) => (a.totalPercent > b.totalPercent) ? -1 : 1)

    if (playerArray.length > 1) {
        return (
            <div className="bg-white shadow p-4 rounded mb-4">
                <h1 className="font-bold border-b mb-2 pb-2">Win The <span className="text-red-600">{dateText}</span></h1>
                <div className="text-lg flex w-full">
                    <span className="text-center md:w-1/12 w-2/12 mr-3">{playerArray[0].totalPercent ? playerArray[0].totalPercent : '-'}%</span>
                    <h1 className="w-11/12">{playerArray[0].playerName}</h1>
                </div>
                <div className="text-md text-gray-600 flex w-full">
                    <span className="text-center md:w-1/12 w-2/12 mr-3">{playerArray[1].totalPercent ? playerArray[1].totalPercent : '-'}%</span>
                    <h1 className="w-11/12">{playerArray[1].playerName}</h1>
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>
    }
}


const Card = connect(mapStateToProps)(WinYearCard);

export default Card;