import { connect } from 'react-redux';
import React from 'react';
import * as Cruncher from '../../numberCrunchers/index'

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}


// const calculatePosAndNeg = (player, stats, dateParam, statCategory) => {
//     let neutrals = ['Competitive', 'Diving'];
//     let statArray = [];
//     let positiveStats = 0;
//     let negativeStats = 0;
//     if (stats) {
//         stats.map(x => {
//             let statDay = new Date(x.stat.createdAt.seconds * 1000);
//             console.log(x.stat.playerName, player);
//             if (x.stat.playerName === player && Cruncher.datesAreInRange(statDay, new Date(), dateParam)) {
//                 if (x.stat.isPositive) {
//                     positiveStats++;
//                 } else if (!x.stat.isPositive && !neutrals.includes(x.stat.statName)) {
//                     negativeStats++;
//                 }
//             }
//         });
//     }
//     statArray.push(positiveStats);
//     statArray.push(negativeStats);
//     return statArray;
// };

// const overallRanking = (players, stats, dateParam) => {
//     let playerArray = []
//     if (players) {
//         players.map(x => {
//             let totalPositives = calculatePosAndNeg(x.player.playerName, stats, dateParam)[0];
//             let totalNegatives = calculatePosAndNeg(x.player.playerName, stats, dateParam)[1];
//             let totalChances = totalPositives + totalNegatives;

//             let playerStatInfo = {
//                 playerName: x.player.playerName,
//                 totalPositives: totalPositives,
//                 totalNegatives: totalNegatives,
//                 totalChances: (totalPositives + totalNegatives),
//                 totalPercent: Math.round(((totalPositives / totalChances) * 100) * 10) / 10,
//             }
//             playerArray.push(playerStatInfo);
//         });
//     }

//     //return the sorted array
//     return playerArray.sort((a, b) => (a.totalPercent > b.totalPercent) ? -1 : 1)
// }

const WinYearCard = ({ players, stats, dateParam, dateText, statCategory }) => {
    let playerArray = [];
    let neutrals = ['Competitive', 'Diving'];
    players.map(x => {
        let posCounter = 0;
        let negCounter = 0;
        stats.map(y => {
            if (x.player.playerName === y.stat.playerName && y.stat.isPositive) {
                console.log('hello');
                posCounter++;
            } else if(x.player.playerName === y.stat.playerName && (!y.stat.isPositive)){
                negCounter++;
            }
            // if (x.player.playerName === y.stat.playerName) {
            //     if (y.stat.isPositive) {
            //         posCounter++;
            //     } else if (!y.stat.isPositive && !neutrals.includes(y.stat.statName)) {
            //         negCounter++;
            //     }
            // }
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

    //let playerArray = overallRanking(players, stats, dateParam, statCategory);
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