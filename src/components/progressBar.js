import React from 'react';

function ProgressBar(props) {
    let widthString = props.width + '%';
    let width = {
        width: widthString,
    }
    return (
        <div className="relative pt-1">
            <div className="overflow-hidden h-3 mb-4 text-xs flex rounded">
                <div style={width} className="rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
            </div>
        </div>
    );
}
export default ProgressBar;