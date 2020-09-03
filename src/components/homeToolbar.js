import React, { useContext } from 'react';
import logo from '../assets/unl-logo.png';
import { FirebaseContext } from '../firebase'

const log = (x) => {
    console.log(x);
}

const click = (context) => {
    //console.log('1', context.firebase);
    //print stats

}

function HomeToolbar() {
    const { players, addAdditionalPlayer, sport, setSport } = useContext(FirebaseContext);

    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="w-screen p-4 flex items-center justify-start border-b border-gray-400">
                    <img src={logo} alt="Logo" className="w-10" />
                    <p className="text-xl uppercase font-black" onClick={addAdditionalPlayer}>{sport}</p>
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}
export default HomeToolbar;