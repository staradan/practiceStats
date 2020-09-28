import React, { useEffect, useContext, useCallback } from 'react';
import HomeToolbar from '../components/header';
import Footer from '../components/footer'
import QuickViewTable from '../components/quickViewTable/quickViewTable';
import { DatePicker } from 'react-rainbow-components';
import { FirebaseContext } from '../firebase';
import * as Cruncher from '../numberCrunchers/index';

const stringifyDate = (date) => {
    return date.getFullYear() + ',' + (date.getMonth() + 1) + ',' + date.getDate()
}

const Home = (props) => {
    const { setStats, dateShown, changeDate, callAllPlayers, setPlayers, callStatsInDay, callStatsInPeriod, dateRange, setDateRange } = useContext(FirebaseContext);

    const getDayData = (value) => {
        let dateString = stringifyDate(value);
        callStatsInDay({ startDate: dateString }).then(result => setStats(result.data));
    }

    const getWeekData = (value) => {
        let tempDay = new Date();
        let otherDay = new Date();

        //calculate the first day based on where we are
        let differenceToMonday = value.getDay();
        tempDay.setDate(value.getDate() - differenceToMonday);
        let firstDateString = stringifyDate(tempDay);

        //calculate the second day based on where we are
        let differenceToFriday = 6 - value.getDay();
        otherDay.setDate(value.getDate() + differenceToFriday);
        let lastDateString = stringifyDate(otherDay);

        callStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setStats(result.data));
    }

    const getMonthData = (value) => {
        var firstDay = new Date(value.getFullYear(), value.getMonth(), 1);
        let firstDateString = stringifyDate(firstDay);

        var lastDay = new Date(value.getFullYear(), value.getMonth() + 1, 0);
        let lastDateString = stringifyDate(lastDay);

        callStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setStats(result.data));
    }
    //get the team's players and the day's stats
    useEffect(() => {
        let dateString = dateShown.getFullYear() + ',' + (dateShown.getMonth() + 1) + ',' + dateShown.getDate();
        callStatsInDay({ startDate: dateString }).then(result => setStats(result.data));
        callAllPlayers().then(result => setPlayers(result.data));
    }, []);

    const updateDate = value => {
        changeDate(value);
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
