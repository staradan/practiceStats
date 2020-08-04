import React from 'react';
import NavToolbar from '../components/navToolbar';
import FavoriteStatCard from '../components/favoriteStatCard';
import AggregateStatCard from '../components/aggregateStatCard';


function ViewInsights() {
    // Import result is the URL of your image
    return (
        <div>
            <NavToolbar />
            <div className="px-4">
                <h1 className="font-semibold">Team Favorites</h1>
                <FavoriteStatCard statName="Throwing" />
                <FavoriteStatCard statName="Fielding" />
                <h1 className="font-semibold mt-4">Team Aggregates</h1>
                <AggregateStatCard statName="Competitive" />
            </div>
        </div>
    );
}
export default ViewInsights;