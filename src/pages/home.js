import React from 'react';
import HomeToolbar from '../components/homeToolbar';
import Footer from '../components/footer'
import TopPercentageCard from '../components/topPercentageCard';
import StatList from '../components/statList';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        players: state.players,
        stats: state.stats,
        statCategories: state.statCategories,
    }
}


const Home = ({ stats, players, statCategories }) => {
    return (
        <div>
            <div className="absolute top-0">
                <HomeToolbar />
            </div>
            <div className="mx-4">
                <div className="mt-24">
                    <h1 className="font-bold">Team <span className="text-gray-600 text-sm font-normal">4/13/20</span></h1>
                    <div className="overflow-x-auto flex">
                        {statCategories.map((x, index) => (
                            <TopPercentageCard key={index} statName={x} percentage={93} change={4} />
                        ))}
                    </div>
                </div>
                <h1 className="font-bold mt-6 mb-2">Efficiency  <span className="text-gray-600 text-sm font-normal">4/13/20</span></h1>
                <div className="flex overflow-x-auto">
                    {statCategories.map((statName, index) => (
                        <StatList statName={statName} players={players} key={index} type="percent" />
                    ))}
                </div>
                <h1 className="font-bold mt-6 mb-2">Reps  <span className="text-gray-600 text-sm font-normal">4/13/20</span></h1>
                <div className="flex overflow-x-auto">
                    {statCategories.map((statName, index) => (
                        <StatList statName={statName} players={players} key={index} type="reps" />
                    ))}
                </div>
                <Footer />
            </div>
        </div>

    );
}

const AllHome = connect(mapStateToProps)(Home);

export default AllHome;
