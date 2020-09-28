import React, { useContext } from 'react';
import StatHistoryRow from './statHistoryRow';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from '../../firebase';
import * as Cruncher from '../../numberCrunchers';

function StatHistoryView() {
    const { stats } = useContext(FirebaseContext);
    // const getTodayStats = () => {
    //     let todayStats = []
    //     //TODO need to update this one here
    //     if (days) {
    //         days.map(x => {
    //             let statDay = new Date(x.createdAt.seconds * 1000);
    //             if (Cruncher.datesAreInRange(statDay, new Date(), 'day')) {
    //                 todayStats.push(x);
    //             }
    //             return null;
    //         });
    //     }

    //     return todayStats;
    // }

    // let todayStats = getTodayStats()

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