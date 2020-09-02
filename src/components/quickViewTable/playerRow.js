import React from 'react';
import PlusMinusBox from './plusMinusBox';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}

const PlayerRow = ({ stats, statCategories, playerName, darkGray }) => {
    let rowBackgroundColor = darkGray ? 'bg-gray-200' : 'bg-white';
    return (
        <div className="flex items-center w-test">
            <div className={"w-40 flex-none sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-4 overflow-hidden flex-no-wrap " + rowBackgroundColor}>
                <h1 className="whitespace-no-wrap">
                    {playerName}
                </h1>
            </div>
            {stats != null ? statCategories.map((statName, index) => (
                <PlusMinusBox rowBackgroundColor={rowBackgroundColor} playerName={playerName} key={index} statName={statName} />
            )) : <h1>Loading...</h1>}
        </div>
    );
}

const Row = connect(mapStateToProps)(PlayerRow);

export default Row;
