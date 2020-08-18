import React from 'react';
import PlayerRow from './playerRow';
import ColumnHeader from './columnHeader';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}

const QuickRecordTable = ({ statCategories, players, stats }) => {
    return (
        <div className="overflow-scroll rounded-sm">
            <div className="flex items-center">
                <div className="w-24 sticky left-0 flex-none font-semibold text-sm text-gray-700 bg-gray-400 border-gray-600 border-r-2 text-left px-4 py-2 big-width">Name</div>
                {stats != null ? statCategories.map((statName, index) => (
                    <ColumnHeader statName={statName} key={index} />
                )) : <h1>Loading...</h1>}
            </div>
            <div>
                {players.map((player, index) => (
                    <PlayerRow name={player} darkGray={(index % 2 === 1)} key={index} />
                ))}
            </div>
        </div>
    );
}

const Table = connect(mapStateToProps)(QuickRecordTable);

export default Table;