import React, { useEffect, useContext, useState } from 'react';
import HomeToolbar from '../components/header';
import Footer from '../components/footer'
import QuickViewTable from '../components/quickViewTable/quickViewTable';
import { DatePicker } from 'react-rainbow-components';
import { FirebaseContext } from '../firebase';

const stringifyDate = (date) => {
    return date.getFullYear() + ',' + (date.getMonth() + 1) + ',' + date.getDate()
}


const Home = (props) => {
    const { setStats, setViewOnlyStats, newGetStatsInPeriod, callStatsInPeriod, dateShown, setDate, callAllPlayers, setPlayers, dateRange, setDateRange } = useContext(FirebaseContext);

    /**
     * 
     * @param {Date} value, the date that the user has selected.
     * 
     * This gets the stats for the day 
     */
    const getDayData = async (value) => {
        setViewOnlyStats({});
        let currentDateString = stringifyDate(value);

        var tomorrow = new Date(value);
        await tomorrow.setDate(tomorrow.getDate() + 1);
        let nextDateString = stringifyDate(tomorrow);

        newGetStatsInPeriod({ startDate: currentDateString, endDate: nextDateString }).then(result => {
            setViewOnlyStats(result.data);
        });
        callStatsInPeriod({ startDate: currentDateString, endDate: nextDateString }).then(result => {
            setStats(result.data);
        });
    }

    /**
     * 
     * @param {Date} value, the date that has been selected
     * 
     * This gets the stats for the week of the value, spanning months
     */
    const getWeekData = (value) => {
        setViewOnlyStats({});
        let tempDay = new Date(value);
        let otherDay = new Date(value);

        //calculate the first day based on where we are
        let differenceToMonday = value.getDay();
        tempDay.setDate(value.getDate() - differenceToMonday);
        let firstDateString = stringifyDate(tempDay);

        //calculate the second day based on where we are
        let differenceToFriday = 6 - value.getDay();
        otherDay.setDate(value.getDate() + differenceToFriday);
        let lastDateString = stringifyDate(otherDay);

        newGetStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setViewOnlyStats(result.data));
        callStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setStats(result.data));
    }

    /**
     * 
     * @param {Date} value, the selected date
     * 
     * Gets the stats for the value's month. 
     */
    const getMonthData = (value) => {
        setViewOnlyStats({});
        var firstDay = new Date(value.getFullYear(), value.getMonth(), 1);
        let firstDateString = stringifyDate(firstDay);

        var lastDay = new Date(value.getFullYear(), value.getMonth() + 1, 0);
        let lastDateString = stringifyDate(lastDay);

        newGetStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setViewOnlyStats(result.data));
        callStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setStats(result.data));
    }



    /**
     * When home loads, load the current day's stats and the players
     * TODO: the stats and players won't load if you don't view this page first and go straight to the taking stats page
     * NOTE: the empty array passed in at the end I think makes sure it only runs once. 
     */
    useEffect(() => {
        getDayData(dateShown);
        callAllPlayers().then(result => {
            result.data.players.map((x, index) => {
                x.ranking = index;
            });
            setPlayers(result.data.players)
        });
    }, []);

    /**
     * 
     * @param {Date} value, the new date that is selected
     * 
     * This runs when the user updates the date with the calendar 
     */
    const updateDate = value => {
        setDate(value);
        //if the range is 7, convert the first date to Monday and last day to Friday
        if (dateRange === 1) {
            getDayData(value);
        } else if (dateRange === 7) {
            getWeekData(value);
        } else if (dateRange === 31) {
            getMonthData(value);
        }
    }

    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div>
                    <div className="absolute top-0">
                        <HomeToolbar />
                    </div>
                    <div className="mx-4 mt-24">
                        <div className="mb-24">
                            <div className="mb-4 md:w-1/2">
                                <DatePicker
                                    formatStyle="small"
                                    value={dateShown}
                                    onChange={value => updateDate(value)}
                                />
                            </div>
                            <div className="mb-4 text-center">
                                <button onClick={() => {
                                    setDateRange(1);
                                    getDayData(dateShown);
                                }} className={"shadow mx-4 font-bold py-2 px-4 rounded " + (dateRange === 1 ? 'text-red-600' : 'text-black')}>
                                    Day
                                </button>
                                <button onClick={() => {
                                    setDateRange(7);
                                    getWeekData(dateShown);
                                }} className={"shadow mx-4 font-bold py-2 px-4 rounded " + (dateRange === 7 ? 'text-red-600' : 'text-black')}>
                                    Week
                                 </button>
                                <button onClick={() => {
                                    setDateRange(31);
                                    getMonthData(dateShown);
                                }} className={"shadow mx-4 font-bold py-2 px-4 rounded " + (dateRange === 31 ? 'text-red-600' : 'text-black')}>
                                    Month
                                </button>
                            </div>
                            <QuickViewTable />
                        </div>
                        < Footer />
                    </div >
                </div>
            )}
        </FirebaseContext.Consumer>
    );

}

export default Home;
