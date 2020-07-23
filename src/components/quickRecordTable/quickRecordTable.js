import React from 'react';
import PlayerRow from './playerRow';
import ColumnHeader from './columnHeader';


function QuickRecordTable() {
    // Import result is the URL of your image
    let names = [
        'Schwellenbach',
        'Gillin',
        'Rosebury',
        'Boynton'
    ];
    return (

        <div className="max-w-full overflow-scroll rounded-sm">
            <div className="flex items-center max-w-full">
                <div className="w-1/3 sticky left-0 flex-none font-semibold text-sm text-gray-700 bg-gray-400 border-gray-600 border-r-2 text-left px-4 py-2">Name</div>
                <ColumnHeader statName="Throwing" />
                <ColumnHeader statName="Fielding" />
                <ColumnHeader statName="Diving" />
                <ColumnHeader statName="Competitive" />
            </div>
            <div>
                <PlayerRow name="Schwellenbach" />
                <PlayerRow name="Gillin" darkGray="true" />
                <PlayerRow name="Schwellenbach" />
                <PlayerRow name="Gillin" darkGray="true" />
                <PlayerRow name="Schwellenbach" />
                <PlayerRow name="Gillin" darkGray="true" />
                <PlayerRow name="Schwellenbach" />
                <PlayerRow name="Gillin" darkGray="true" />
                <PlayerRow name="Stara" />
            </div>
        </div>
    );
}
export default QuickRecordTable;