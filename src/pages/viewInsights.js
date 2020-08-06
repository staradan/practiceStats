import React from 'react';
import Footer from '../components/footer'
import FavoriteStatCard from '../components/favoriteStatCard';
import AggregateStatCard from '../components/aggregateStatCard';
import NamedProgressBar from '../components/aggregateCardViz/namedProgressBar';
import NumberComparison from '../components/aggregateCardViz/numberComparison';

function ViewInsights() {
    // Import result is the URL of your image
    return (
        <div>
            <div className="px-4">
                <h1 className="font-semibold">Team Stats</h1>
                <FavoriteStatCard statName="Throwing" />
                <FavoriteStatCard statName="Fielding" />
                <h1 className="font-semibold mt-4">Notable Stats</h1>
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
            <Footer />
        </div>
    );
}
export default ViewInsights;