import React, { useEffect, useContext, useState } from 'react';
import HomeToolbar from '../components/header';
import Footer from '../components/footer'
import QuickViewTable from '../components/quickViewTable/quickViewTable';
import { DatePicker } from 'react-rainbow-components';
import { FirebaseContext } from '../firebase';

const stringifyDate = (date) => {
    return date.getFullYear() + ',' + (date.getMonth() + 1) + ',' + date.getDate()
}

// TODO: This could be split into two functions? Ideally, the heavy lifting could be done on the backend
const makePlayerListCSV = (data, categories) => {
    if (data === undefined || data.length < 1)
        return undefined;

    let playerData = {};
    const OVERALL = 'Overall'; const CATEGORY_KEY='statName'; const POS = '_pos'; const NEG = '_neg'; const PCT = '_pct';
    const EXCLUDE_FROM_POS = ['Ball On Ground']
    const EXCLUDE_FROM_PCT = EXCLUDE_FROM_POS;
    const EXCLUDE_FROM_NEG_TOTAL = ['Competitive']
    categories.unshift(OVERALL);

    // iterate through each row and aggregate positive/negative plays by player name
    for (let row = 0; row < data.length; row++) {
        let playerName = data[row].playerName;
        // if this is the first time this name appears, initilize it in the data object
        if (playerData[playerName] === undefined) {
            playerData[playerName] = {name : playerName}
            for (let i = 0; i < categories.length; i++) {
                if (!EXCLUDE_FROM_POS.includes(categories[i]))
                    playerData[playerName][categories[i] + POS] = 0;
                playerData[playerName][categories[i] + NEG] = 0;
                if (!EXCLUDE_FROM_PCT.includes(categories[i]))
                    playerData[playerName][categories[i] + PCT] = undefined;
            }
        }
        // increment the appropriate positive/negative and overall values
        if (data[row].isPositive) {
            playerData[playerName][data[row][CATEGORY_KEY] + POS]++; 
            playerData[playerName][OVERALL + POS]++;
        } else {
            playerData[playerName][data[row][CATEGORY_KEY] + NEG]++;
            if (!EXCLUDE_FROM_NEG_TOTAL.includes(data[row][CATEGORY_KEY]))
                playerData[playerName][OVERALL + NEG]++;
        }
    }

    // calculate and assign percentages
    for (let player in playerData) { 
        for (let i = 0; i < categories.length; i++) {
            if (!EXCLUDE_FROM_PCT.includes(categories[i]))
                playerData[player][categories[i] + PCT] = 
                    playerData[player][categories[i] + POS] / 
                        (playerData[player][categories[i] + POS] + 
                        playerData[player][categories[i] + NEG]);
        }
    }

    // translate the new player data object into a csv string
    let headers = Object.keys(playerData[Object.keys(playerData)[0]]);
    let result = headers.join(",") + "\n";
    for (let player in playerData) {
        for (let property in playerData[player]) {
            result += playerData[player][property] + ",";
        }
        result += "\n";
    }

    return result;
}


const makeStatListCSV = (data) => {
    let csv;
    // Loop the array of objects
    for (let row = 0; row < data.length; row++) {
        let keysAmount = Object.keys(data[row]).length
        let keysCounter = 0

        // If this is the first row, generate the headings
        if (row === 0) {

            // Loop each property of the object
            for (let key in data[row]) {

                // This is to not add a comma at the last cell
                // The '\r\n' adds a new line
                if (key) {
                    csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
                    keysCounter++
                }
            }
        } else {
            for (let key in data[row]) {
                if (typeof data[row][key] === 'object') {
                    csv += data[row][key]._seconds + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
                } else {
                    csv += data[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
                }
                keysCounter++
            }
        }

        keysCounter = 0
    }

    return csv;
}


const Home = (props) => {
    const { stats, setStats, setViewOnlyStats, newGetStatsInPeriod, callStatsInPeriod, dateShown, setDate, callAllPlayers, setPlayers, dateRange, setDateRange, categories } = useContext(FirebaseContext);

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
            //this list of stats is for exporting maybe...
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
     * 
     * @param {Date} value, the selected date
     * 
     * TODO - this has a serious bug lol
     */
    const getAllTimeData = (value) => {
        setViewOnlyStats({});
        var firstDay = new Date(2016, 11, 17, 0, 0, 0, 0);
        let firstDateString = stringifyDate(firstDay);

        var lastDay = new Date(2030, 11, 17, 0, 0, 0, 0);
        let lastDateString = stringifyDate(lastDay);

        newGetStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setViewOnlyStats(result.data));
        callStatsInPeriod({ startDate: firstDateString, endDate: lastDateString }).then(result => setStats(result.data));
    }


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
        } else if (dateRange === 0) {
            getAllTimeData(value);
        }
    }



    /**
     * When home loads, load the current day's stats and the players
     * TODO: the stats and players won't load if you don't view this page first and go straight to the taking stats page
     * NOTE: the empty array passed in at the end I think makes sure it only runs once. 
     */
    useEffect(() => {
        updateDate(dateShown);
        callAllPlayers().then(result => {
            result.data.players.map((x, index) => {
                x.ranking = index;
            });
            setPlayers(result.data.players)
        });
    }, []);

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
                                <button onClick={() => {
                                    setDateRange(0);
                                    getAllTimeData(dateShown);
                                }} className={"shadow mx-4 font-bold py-2 px-4 rounded " + (dateRange === 0 ? 'text-red-600' : 'text-black')}>
                                    All-Time
                                </button>
                            </div>
                            <div className="mb-2">
                                <a
                                    className="text-blue-600"
                                    href={'data:text/plain;charset=utf-8,' + encodeURIComponent(makePlayerListCSV(stats, categories))}
                                    download={'VIZN_stats_' + Date.now() + '.csv'}
                                >
                                    Download to Excel
                            </a>
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
