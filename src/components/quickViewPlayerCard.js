import React from 'react';


function QuickViewPlayerCard(props) {
    return (
        <div className="mb-1 flex border-b">
            <div className="w-1/12 text-gray-600">{props.rank}.</div>
            <div className="w-9/12 no-wrap overflow-hidden whitespace-no-wrap ml-1">{props.name}</div>
            <div className="w-2/12 text-green-500 text-right">{props.percent}%</div>
        </div>
    );
}

export default QuickViewPlayerCard;
