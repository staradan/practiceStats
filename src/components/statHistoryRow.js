import React from 'react';

function StatHistoryRow(props) {
    let statTextColor = props.isPositiveStat ? 'text-blue-400' : 'text-red-400';
    let statDecorator = props.isPositiveStat ? '+ ' : '- ';
    return (
        <div className="h-10 bg-gray-200 w-full mt-1 rounded-sm flex pl-2 pr-4">
            <div className="w-2/5 rounded-sm text-left pt-2 pr-2 overflow-x-hidden whitespace-no-wrap">{props.playerName}</div>
            <div className={"w-2/5 pt-2 text-left ml-2 pr-2 pl-4 overflow-x-hidden whitespace-no-wrap " + statTextColor}>{statDecorator + props.playerStatistic}</div>
            <div className="w-1/5 rounded-sm pt-2 text-right">UNDO</div>
        </div>
    );
}
export default StatHistoryRow;