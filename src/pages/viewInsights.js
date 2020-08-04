import React from 'react';
import NavToolbar from '../components/navToolbar';
import FavoriteStatCard from '../components/favoriteStatCard';
import AggregateStatCard from '../components/aggregateStatCard';
import NamedProgressBar from '../components/aggregateCardViz/namedProgressBar';
import NumberComparison from '../components/aggregateCardViz/numberComparison';

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
                <AggregateStatCard 
                    statName="Competitive" 
                    message="Jaxon Hallmark had the best throwing percentage today"
                    visualization={<NamedProgressBar/>}
                />
                <AggregateStatCard 
                    statName="Competitive"
                    message="Drew Gillin had the most throwing reps today" 
                    visualization={<NumberComparison />}
                />
            </div>
        </div>
    );
}
export default ViewInsights;