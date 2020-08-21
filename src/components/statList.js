import React, { useState, useEffect } from 'react';
import QuickViewPlayerCard from '../components/quickViewPlayerCard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}

const getPositiveStats = (name, statName, stats) => {
    let positive = 0;
    for (const x in stats) {
        if (stats[x].stat.isPositive && stats[x].stat.playerName === name && stats[x].stat.statName === statName) {
            positive++;
        }
    }
    return positive
}

const getNegativeStats = (name, statName, stats) => {
    let negative = 0;
    for (const x in stats) {
        if (!stats[x].stat.isPositive && stats[x].stat.playerName === name && stats[x].stat.statName === statName) {
            negative++;
        }
    }
    return negative
}

const getTotal = (name, statName, stats) => {
    return getNegativeStats(name, statName, stats) + getPositiveStats(name, statName, stats);
}

const getPercent = (name, statName, stats) => {
    let positive = getPositiveStats(name, statName, stats);
    let all = getNegativeStats(name, statName, stats) + positive;
    let percent = (positive / all) * 100;
    return (isNaN(percent) ? '-%' : (percent + '%'))
}

const StatList = ({ stats, statName, players, type }) => {
    return (
        <div className="mr-6 w-screen">
            <h1 className="text-gray-700">{statName}</h1>
            <div className="mt-2">
                {players.map((name, index) => (
                    <QuickViewPlayerCard rank={index + 1} name={name} percent={type === "percent" ? getPercent(name, statName, stats) : getTotal(name, statName, stats)} key={index} />
                ))}
            </div>
        </div>
    );
}


const List = connect(mapStateToProps)(StatList);

export default List;
