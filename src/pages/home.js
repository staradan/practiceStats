import React, { useEffect, useContext, useCallback } from 'react';
import HomeToolbar from '../components/homeToolbar';
import Footer from '../components/footer'
import QuickViewTable from '../components/quickViewTable/quickViewTable';
import { DatePicker } from 'react-rainbow-components';
import { FirebaseContext } from '../firebase';
import * as Cruncher from '../numberCrunchers/index';

const Home = (props) => {
    const { setPlayers, firebase, dateShown, changeDate, setDay, players } = useContext(FirebaseContext);

    async function getDayStats(dayString) {
        let stats = [];

        players.forEach(player => {
            player.neutralStats = [];
            player.negativeStats = [];
            player.positiveStats = [];
        })

        firebase.db.collection(dayString).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let stat = {
                    playerName: doc.data().playerName,
                    createdAt: doc.data().createdAt,
                    statName: doc.data().statName,
                    isPositive: doc.data().isPositive,
                    statID: doc.data().statID,
                }
                stats.push(stat);

                players.forEach(player => {
                    if (player.playerName === doc.data().playerName) {
                        if (doc.data().statName === 'Diving') {  //get neutrals
                            player.neutralStats.push(stat);
                        } else if (doc.data().statName === 'Competitive' && !doc.data().isPositive) {
                            player.neutralStats.push(stat);
                        } else if (doc.data().isPositive) {
                            player.positiveStats.push(stat);
                        } else {   //get negatives
                            player.negativeStats.push(stat);
                        }
                    }
                });

            });
            players.forEach(player => {
                let totalStats = player.positiveStats.length + player.negativeStats.length + player.neutralStats.length;
                player.successPercentage =
                    totalStats > 0 && player.positiveStats.length > 0 ? (player.positiveStats.length / totalStats).toFixed(2) * 100 : 0;
            });

            setPlayers(players.sort(function (a, b) {
                return b.successPercentage - a.successPercentage;
            }))
            setDay(stats);
        });
    }

    async function getWeekStats() {
        let curr = dateShown;
        let week = []

        //get all the dates in the week
        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first))
            week.push(day)
        }

        console.log(week);
    }

    async function getMonthStats(dateObj) {

    }

    const updateDate = value => {
        changeDate(value);
        console.log('date', Cruncher.dateToString(value));
        getDayStats(Cruncher.dateToString(value));
        getWeekStats();
    }

    useEffect(() => {
        //getPlayers();
        //let date = Cruncher.dateToString(dateShown);
        //getDayStats(date);
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





    // const getWeekWorthOfStats = () => {
    //     //let dayOfWeek = dateShown.getDay();
    //     let sunday = 0;
    //     let saturday = 6;
    //     let stats = [];
    //     let day = dateShown;
    //     let dateString = Cruncher.dateToString(day);
    //     let statsAlreadyExist = false;
    //     //console.log('..', dayOfWeek);
    //     days.map(x => {
    //         if (x.date === dateString) {
    //             statsAlreadyExist = true;
    //             console.log('had it!');
    //         }
    //     })
    //     if (!statsAlreadyExist) {
    //         for (let i = sunday; i <= saturday; i++) {
    //             //make a day for that day 
    //             let day = dateShown;
    //             let dateString = Cruncher.dateToString(day);

    //             var currentDay = day.getDay();
    //             var distance = i - currentDay;
    //             day.setDate(day.getDate() + distance);
    //             console.log(i, days);

    //             //add the day's stats to the context
    //             firebase.db.collection(Cruncher.dateToString(day)).get().then(function (querySnapshot) {
    //                 querySnapshot.forEach(function (doc) {
    //                     let stat = {
    //                         playerName: doc.data().playerName,
    //                         createdAt: doc.data().createdAt,
    //                         statName: doc.data().statName,
    //                         isPositive: doc.data().isPositive,
    //                         statID: doc.data().statID,
    //                     }
    //                     stats.push(stat);
    //                 });
    //                 addAdditionalDay({ date: dateString, stats: stats });
    //                 updateCurrentWeek(stats);
    //                 // console.log('week', currentWeek, stats);
    //             });
    //             //getDayStats(Cruncher.dateToString(day));
    //         }
    //     }
    //}
