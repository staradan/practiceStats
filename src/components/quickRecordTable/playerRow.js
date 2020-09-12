import React, { useContext } from 'react';
import PlusMinusBox from './plusMinusBox';
//import { connect } from 'react-redux';
import { FirebaseContext } from '../../firebase'

const PlayerRow = ({ playerName, darkGray }) => {
    let rowBackgroundColor = darkGray ? 'bg-gray-200' : 'bg-white';
    const { days } = useContext(FirebaseContext);
    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="flex items-center w-test">
                    <div className={"w-1/12 flex-none sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-4 overflow-hidden flex-no-wrap " + rowBackgroundColor}>
                        <h1 className="whitespace-no-wrap">
                            {playerName}
                        </h1>
                    </div>
                    {context.days != null ? context.categories.map((statName, index) => (
                        <PlusMinusBox rowBackgroundColor={rowBackgroundColor} playerName={playerName} key={index} statName={statName} />
                    )) : <h1>Loading...</h1>}
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default PlayerRow;
