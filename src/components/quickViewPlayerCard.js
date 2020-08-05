import React from 'react';


function QuickViewPlayerCard(props) {
    return (
        <div className="mb-3">
            <div className="text-left p-3 border rounded">
                <h1 className="text-gray-700"><span className="text-black">{props.rank}. </span>{props.name}</h1>
                <div className="flex">
                    <h1 className="text-3xl mr-4">{props.percent}%</h1>
                    <p className="text-green-500 font-bold mt-3 ml-3">+{props.positive}</p>
                    <p className="text-red-500 font-bold mt-3 ml-6">-{props.negative}</p>
                </div>
            </div>
        </div>
    );
}

export default QuickViewPlayerCard;
