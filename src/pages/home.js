import React, { useState, useEffect, useContext } from 'react';
import HomeToolbar from '../components/homeToolbar';
import Footer from '../components/footer'
import WinCard from '../components/winCards/winAllTimeCard';
import { connect } from 'react-redux';
import Select from 'react-select';
import QuickViewTable from '../components/quickViewTable/quickViewTable';
import { DatePicker } from 'react-rainbow-components';
import Firebase, { FirebaseContext } from '../firebase'
//import firebase from 'firebase';
//const db = firebase.firestore();

// const mapStateToProps = state => {
//     return {
//         statCategories: state.statCategories,
//     }
// }

const Home = (props) => {
    const { firebase, addAdditionalPlayer, addAdditionalStat, dateShown, changeDate } = useContext(FirebaseContext);

    const updateDate = value => {
        changeDate(value);
    }

    // useEffect(() => {
    //     //get the players
    //     firebase.db.collection("players").get().then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //             let player = {
    //                 teamID: doc.data().teamID,
    //                 playerName: doc.data().playerName,
    //                 playerID: doc.data().playerID,
    //                 stats: [],
    //             }
    //             databasePlayers.push(player);
    //         });
    //         databasePlayers.map(player => {
    //             addAdditionalPlayer(player.playerName);
    //         })
    //     });

    //     //get the stats
    //     firebase.db.collection("stats").get().then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //             let stat = {
    //                 playerName: doc.data().playerName,
    //                 createdAt: doc.data().createdAt,
    //                 statName: doc.data().statName,
    //                 isPositive: doc.data().isPositive,
    //                 statID: doc.data().statID,
    //             }
    //             databaseStats.push(stat);
    //         });

    //         databaseStats.map(stat => {
    //             addAdditionalStat(stat);
    //         });
    //     });

    // }, []);

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

    //setPlayers(firebase.getAllPlayers()[0]);
    //add all the players and stats to the context
}

//const AllHome = connect(mapStateToProps)(Home);

export default Home;
