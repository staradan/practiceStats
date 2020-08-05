import React from 'react';

function FavoriteStatCard(props) {
    return (
        <div className="bg-gray-300 py-4 px-4 mt-2 rounded">
            <h1 className="mb-2 text-red-500 font-semibold">{props.statName}</h1>
            <h3 className="text-gray-500"><span className="text-red-500 text-xl font-semibold">98%</span> out of <span className="text-black text-xl font-bold">385</span> reps</h3>
        </div>
    );
}
export default FavoriteStatCard;