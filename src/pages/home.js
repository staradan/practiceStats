import React, { useState, useEffect } from 'react';
import HomeToolbar from '../components/homeToolbar';
import Footer from '../components/footer'
import WinCard from '../components/winCards/winAllTimeCard';
import { connect } from 'react-redux';
import Select from 'react-select';

const mapStateToProps = state => {
    return {
        statCategories: state.statCategories,
    }
}

const Home = ({ statCategories }) => {
    const options = [];
    const [selectedOption, setSelectedOption] = useState('Overall');
    options.push({
        value: 'Overall',
        label: 'Overall'
    })
    statCategories.map(x => {
        options.push({
            value: x, label: x
        })
    });
    const handleChange = selectedOption => {
        console.log('first', selectedOption.value);
        setSelectedOption(selectedOption.value);
    };
    return (
        <div>
            <div className="absolute top-0">
                <HomeToolbar />
            </div>
            <div className="mx-4 mt-24">
                <h1 className="text-gray-600 font-normal text-sm w-1/12 content-center mb-4">8/24/2020</h1>
                <WinCard dateParam="day" dateText="Day" statCategory={selectedOption} />
                <WinCard dateParam="week" dateText="Week" statCategory={selectedOption} />
                <WinCard dateParam="month" dateText="Month" statCategory={selectedOption} />
                <WinCard dateParam="year" dateText="Year" statCategory={selectedOption} />
                <div className="flex content-center">
                    <div className="w-2/12">
                        <Select
                            className="z-50"
                            placeholder={selectedOption}
                            value={selectedOption}
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                </div>
                < Footer />
            </div >
        </div >

    );
}

const AllHome = connect(mapStateToProps)(Home);

export default AllHome;
