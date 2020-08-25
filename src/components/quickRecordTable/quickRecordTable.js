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
        <div className="overflow-scroll rounded-sm border border-gray-400 shadow w-full w-test">
            <div className="flex items-center w-test">
                <div className="w-1/12 sticky left-0 flex-none font-semibold text-sm text-gray-700 bg-gray-400 border-gray-600 border-r-2 text-left px-4 big-width">Name</div>
                {stats != null ? statCategories.map((statName, index) => (
                    <ColumnHeader statName={statName} key={index} />
                )) : <h1>Loading...</h1>}
            </div>
            <div>
                {players.map((x, index) => (
                    <PlayerRow playerName={x.player.playerName} darkGray={(index % 2 === 1)} key={index} />
                ))}
            </div>
        </div >
    );
}

const Table = connect(mapStateToProps)(QuickRecordTable);

export default Table;