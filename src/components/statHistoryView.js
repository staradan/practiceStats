import React from 'react';
import StatHistoryRow from './statHistoryRow';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { stats: state.stats };
};

//maybe add the stuff
const datesAreOnSameDay = (first, second, dateParam) => {
    if (dateParam === 'day') {
        console.log('day');
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        );
    }
}

function StatHistoryView({ stats }) {
    if (stats != null) {
        return (
            <div className="w-full text-center h-48 overflow-y-scroll rounded-sm shadow">
                {
                    stats.slice(0).reverse().map((stat, index) => (
                        <StatHistoryRow
                            playerName={stat.stat.playerName}
                            playerStatistic={stat.stat.statName}
                            isPositiveStat={stat.stat.isPositive}
                            key={index}
                            statID={stat.stat.statID}
                        />
                    ))
                }
            </div>
        );
    } else {
        return (
            <div className="w-full text-center h-48 overflow-y-scroll rounded-sm bg-gray-200">
                <div className="mt-16">
                    <FontAwesomeIcon icon={faSearch} size="2x" />
                    <h1>No Stats to Display :(</h1>
                </div>
            </div>
        );
    }
}

const View = connect(mapStateToProps)(StatHistoryView);

export default View;