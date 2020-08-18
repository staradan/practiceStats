import React from 'react';


function QuickViewPlayerCard(props) {
    return (
        <div className="mb-1 flex border-b">
            <div className="w-1/12 text-gray-600">{props.rank}.</div>
            <div className="w-8/12 no-wrap overflow-hidden whitespace-no-wrap ml-1">{props.name}</div>
            <div className="w-2/12 text-blue-500 text-right ml-2">{props.percent}</div>
        </div>
    );
}

export default QuickViewPlayerCard;
