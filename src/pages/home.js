import React, { useState, useEffect } from 'react';
import HomeToolbar from '../components/homeToolbar';
import Footer from '../components/footer'
import WinCard from '../components/winCards/winAllTimeCard';
import WinDayCard from '../components/winCards/winDayCard';
import WinMonthCard from '../components/winCards/winMonthCard'
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
            <div className="mx-4 mt-24">
                <h1 className="mb-4"><span className="text-gray-600 font-normal text-sm"> 8/24/2020</span></h1>
                <WinCard dateParam="day" dateText="Day" />
                <WinCard dateParam="week" dateText="Week" />
                <WinCard dateParam="month" dateText="Month" />
                <WinCard dateParam="year" dateText="Year" />
                < Footer />
            </div >
        </div >

    );
}

const AllHome = connect(mapStateToProps)(Home);

export default AllHome;
