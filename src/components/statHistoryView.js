import React from 'react';
import StatHistoryRow from './statHistoryRow';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatHistoryView() {
    //TODO need to have the stats object here...
    let stats = [
        // {playerName: 'Spencer Schwellenbach', statName: 'Fielding', isPositiveStat: false},
        // {playerName: 'Spencer Schwellenbach', statName: 'Fielding', isPositiveStat: false},
        // {playerName: 'Spencer Schwellenbach', statName: 'Fielding', isPositiveStat: false},
        // {playerName: 'Spencer Schwellenbach', statName: 'Fielding', isPositiveStat: false},
        // {playerName: 'Spencer Schwellenbach', statName: 'Fielding', isPositiveStat: false},
    ]

    if(stats.length != 0){
        return(
            <div className="w-full text-center h-48 overflow-y-scroll rounded-sm bg-gray-200">
                {
                    stats.map((stat) => (
                        <StatHistoryRow 
                            playerName={stat.playerName}
                            playerStatistic={stat.playerStatistic} 
                            isPositiveStat={stat.isPositiveStat}
                        />
                    ))
                }
            </div>
        );
    } else {
        return(
            <div className="w-full text-center h-48 overflow-y-scroll rounded-sm bg-gray-200">
                <div className="mt-16">
                    <FontAwesomeIcon icon={faSearch} size="2x" />
                    <h1>No Stats to Display :(</h1>
                </div>
            </div>
        );
    }
}
export default StatHistoryView;