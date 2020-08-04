import React from 'react';
import NamedProgressBar from './aggregateCardViz/namedProgressBar';
import NumberComparison from './aggregateCardViz/numberComparison';

function AggregateStatCard(props) {
    return (
        <div className="bg-gray-200 py-4 px-4 my-4 rounded">
            <h1 className="mb-2 text-purple-600 font-semibold">{props.statName}</h1>
            <h1 className="border-gray-400 border-b pb-3">{props.message}</h1>
            {props.visualization}
        </div>
    );
}
export default AggregateStatCard;