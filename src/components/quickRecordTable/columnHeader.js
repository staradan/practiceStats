import React from 'react';

function ColumnHeader(props) {
    return (
        <div className="w-1/4 whitespace-no-wrap flex-none font-semibold text-center text-sm text-gray-700 bg-gray-400 px-2 overflow-hidden">{props.statName}</div>
    );
}
export default ColumnHeader;