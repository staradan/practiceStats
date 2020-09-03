import React, { useState, useEffect } from 'react';
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

let players = [];

const mapStateToProps = state => {
    return {
        statCategories: state.statCategories,
    }
}

async function getPlayers() {
    // let players = [];
    // let databasePlayers = await db.collection("players").get();

    // console.log(databasePlayers);


    // .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         let player = {
    //             teamID: doc.data().teamID,
    //             playerName: doc.data().playerName,
    //             playerID: doc.data().playerID,
    //             stats: [],
    //         }
    //         players.push(player);
    //     });
    // });

    return players;
}

const Home = (props) => {
    const [date, setDate] = useState(new Date());

    //add all the players and stats to the context


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
                                    value={context.dateShown}
                                    onChange={value => setDate(value)}
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

const AllHome = connect(mapStateToProps)(Home);

export default AllHome;
