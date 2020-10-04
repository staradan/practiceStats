import React, { useContext } from 'react';
import StatHistoryRow from './statHistoryRow';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from '../../firebase';
import * as Cruncher from '../../numberCrunchers';

function StatHistoryView() {
    const { stats } = useContext(FirebaseContext);

    if (stats.length > 0) {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className="w-full text-center h-48 overflow-y-scroll rounded-sm shadow">
                        {
                            stats.slice(0).reverse().map((stat, index) => (
                                <StatHistoryRow
                                    playerName={stat.playerName}
                                    playerStatistic={stat.statName}
                                    isPositiveStat={stat.isPositive}
                                    key={index}
                                    statID={stat.statID}
                                />
                            ))
                        }
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    } else {
        return (
            <FirebaseContext.Consumer>
                {(context) => (
                    <div className="w-full text-center h-48 overflow-y-scroll rounded-sm bg-gray-200">
                        <div className="mt-16">
                            <FontAwesomeIcon icon={faSearch} size="2x" />
                            <h1>No Stats to Display :(</h1>
                        </div>
                    </div>
                )}
            </FirebaseContext.Consumer>
        );
    }
}

export default StatHistoryView;