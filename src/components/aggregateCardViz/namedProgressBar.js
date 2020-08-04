import React from 'react';

function NamedProgressBar(props) {
    let playerObjects = [
        {name: 'Dan the Man', percent: '100'},
        {name: 'Team Avg', percent: '40'},
    ] 
    return (
        <div>
            {playerObjects.map(playerObject => (
                <div>
                    <h1 className="mt-2 font-semibold">{playerObject.name}</h1>
                    <div className="relative pt-1">
                        <div className="h-4 mb-4 text-xs flex rounded inline">
                            <div style={{width: `${playerObject.percent}%`}} className="rounded shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                            <h1 className="inline pl-2 font-semibold text-md">{playerObject.percent}%</h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default NamedProgressBar;