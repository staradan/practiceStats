import React from 'react';

function NumberComparison(props) {
    let playerObjects = [
        {name: 'Drew Gillin', number: '128'},
        {name: 'Drew Gillin', number: '114'},
        {name: 'Mia Hamm', number: '109'},
        {name: 'Team Avg', number: '99'},
    ]
    return (
        <div className="flex flex-wrap">
            {playerObjects.map(playerObj => (
                <div className="w-1/2 text-center mt-4" key={playerObj.name}>
                    <h1 className="font-bold text-xl text-purple-600">{playerObj.number}</h1>
                    <h3 className="text-gray-700">{playerObj.name}</h3>
                </div>
            ))}
        </div>
    );
}
export default NumberComparison;