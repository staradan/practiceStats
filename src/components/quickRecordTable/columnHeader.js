import React from 'react';

function ColumnHeader(props) {
    return (
        <div className="w-16 flex-none font-semibold text-center text-sm text-gray-700 bg-gray-400 px-2 py-2 overflow-hidden">{props.statName}</div>
    );
}
export default ColumnHeader;