import React from 'react';


function topPercentageCard(props) {
    return (
        <div className="text-center mr-4">
            <h1 className="font-thin text-3xl text-black-500 mr-4">{props.percentage}%</h1>
            <p className="text-xs text-left text-green-500">+{props.change}%</p>
            <p className="text-xs text-left">{props.statName}</p>
        </div>
    );
}

export default topPercentageCard;