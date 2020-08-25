import { connect } from 'react-redux';
import React from 'react';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}


const datesAreOnSameDay = (first, second, dateParam) => {
    if (dateParam === 'day') {
        console.log('day');
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        );
    } else if (dateParam === 'week') {
        //gotta fix this one man
        return true;
    } else if (dateParam === 'month') {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth()
        );
    } else if (dateParam === 'year') {
        return (
            first.getFullYear() === second.getFullYear()
        )
    } else {
        return true;
    }
}

const calculateAllPositives = (player, stats, dateParam) => {
    let positiveStats = 0;
    if (stats) {
        stats.map(x => {
            let statDay = new Date(x.stat.createdAt.seconds * 1000);
            if (x.stat.isPositive && x.stat.playerName === player && datesAreOnSameDay(statDay, new Date(), dateParam)) {
                positiveStats++;
            }
        });
    }
    return positiveStats;
};

const calculateAllNegatives = (player, stats, dateParam) => {
    let neutrals = ['Competitive', 'Diving'];
    let negativeStats = 0;
    if (stats) {
        stats.map(x => {
            let statDay = new Date(x.stat.createdAt.seconds * 1000);
            if (!x.stat.isPositive && x.stat.playerName === player && !neutrals.includes(x.stat.statName) && datesAreOnSameDay(statDay, new Date(), dateParam)) {
                negativeStats++;
            }
        })
    }
    return negativeStats;
}

const overallRanking = (players, stats, dateParam) => {
    let playerArray = []
    if (players) {
        players.map(x => {
            let totalPositives = calculateAllPositives(x.player.playerName, stats, dateParam);
            let totalNegatives = calculateAllNegatives(x.player.playerName, stats, dateParam);
            let totalChances = totalPositives + totalNegatives;

            let playerStatInfo = {
                playerName: x.player.playerName,
                totalPositives: totalPositives,
                totalNegatives: totalNegatives,
                totalChances: (totalPositives + totalNegatives),
                totalPercent: Math.round(((totalPositives / totalChances) * 100) * 10) / 10,
            }
            playerArray.push(playerStatInfo);
        });
    }

    //return the sorted array
    return playerArray.sort((a, b) => (a.totalPercent > b.totalPercent) ? -1 : 1)
}

const WinYearCard = ({ players, stats, dateParam, dateText }) => {
    let playerArray = overallRanking(players, stats, dateParam);
    if (playerArray.length > 1) {
        return (
            <div className="bg-white shadow p-4 rounded mb-4">
                <h1 className="font-bold border-b mb-2 pb-2">Win The <span className="text-red-600">{dateText}</span></h1>
                <h1 className="text-lg">1. {playerArray[0].playerName} <span>{playerArray[0].totalPercent ? playerArray[0].totalPercent : '-'}%</span></h1>
                <h1 className="text-gray-600 font-sm">2. {playerArray[1].playerName} <span>{playerArray[1].totalPercent ? playerArray[1].totalPercent : '-'}%</span></h1>
            </div>
        );
    } else {
        return <div>Loading...</div>
    }
}


const Card = connect(mapStateToProps)(WinYearCard);

export default Card;