import React from 'react';
import PlusMinusBox from './plusMinusBox';


function PlayerRow(props) {
    let rowBackgroundColor = props.darkGray ? 'bg-gray-200' : 'bg-white';
    return (
        <div className="flex items-center">
            <div className={"w-1/3 sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-2 overflow-hidden " + rowBackgroundColor}> {props.name}</div>
            <PlusMinusBox rowBackgroundColor={rowBackgroundColor} />
            <PlusMinusBox rowBackgroundColor={rowBackgroundColor} />
            <PlusMinusBox rowBackgroundColor={rowBackgroundColor} />
            <PlusMinusBox rowBackgroundColor={rowBackgroundColor} />
        </div>
    );
}
export default PlayerRow;