import React from 'react';
import StatHistoryRow from './statHistoryRow';

function StatHistoryView() {
    //TODO need to have the stats object here...
    return (
        <div className="border-gray-900 w-full text-center h-48 overflow-y-scroll rounded-sm">
            <StatHistoryRow 
                playerName="S. Schwellenbach" 
                playerStatistic="Fielding" 
                isPositiveStat={false}
            />
            <StatHistoryRow 
                playerName="S. Schwellenbach" 
                playerStatistic="Throwing" 
                isPositiveStat={false}
            />
            <StatHistoryRow 
                playerName="C. Chick" 
                playerStatistic="Fielding" 
                isPositiveStat={true}
            />
                        <StatHistoryRow 
                playerName="S. Schwellenbach" 
                playerStatistic="Fielding" 
                isPositiveStat={false}
            />
            <StatHistoryRow 
                playerName="S. Schwellenbach" 
                playerStatistic="Throwing" 
                isPositiveStat={false}
            />
            <StatHistoryRow 
                playerName="C. Chick" 
                playerStatistic="Fielding" 
                isPositiveStat={true}
            />
        </div>
    );
}
export default StatHistoryView;