import React, { useContext } from 'react';
import PlayerRow from './playerRow';
import ColumnHeader from './columnHeader';
import { FirebaseContext } from '../../firebase'

const QuickRecordTable = () => {
    const { players } = useContext(FirebaseContext);

    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="rounded-sm border border-gray-400 shadow relative w-full overflow-auto bg-gray-300 mb-24">
                    <div className="relative flex items-center w-test">
                        <div className="w-1/12 sticky left-0 flex-none font-semibold text-sm text-gray-700 bg-gray-400 border-gray-600 border-r-2 text-left px-4 big-width">Name</div>
                        {context.categories != null ? context.categories.map((statName, index) => (
                            <ColumnHeader statName={statName} key={index} />
                        )) : <h1>Loading...</h1>}
                    </div>
                    <div>
                        {players ? players.sort().map((x, index) => (
                            <PlayerRow playerName={x.playerName} darkGray={(index % 2 === 1)} key={index} />
                        )) : <div>Loading...</div>}
                    </div>
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default QuickRecordTable;