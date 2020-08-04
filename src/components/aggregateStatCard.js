import React from 'react';
import ProgressBar from '../components/progressBar';

function AggregateStatCard(props) {
    return (
        <div className="bg-gray-200 py-4 px-4 mt-2 rounded">
            <h1 className="mb-2 text-purple-600 font-semibold">{props.statName}</h1>
            <h1 className="border-gray-600 border-b pb-3">Jaxon Hallmark had the most competitive attempts today</h1>
            <h1 className="mt-2 font-semibold">Jaxon Hallmark</h1>
            <div>
                <ProgressBar width="60" />
                <h1>25</h1>
                <h1 className="mt-2 font-semibold">Team</h1>
                <div>
                    <ProgressBar width="20" />
                    <h1>7</h1>
                </div>
            </div>
        </div>
    );
}
export default AggregateStatCard;