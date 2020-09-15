import React, { useContext } from 'react';
import PlusMinusBox from './plusMinusBox';
import { FirebaseContext } from '../../firebase'

const PlayerRow = ({ player, darkGray }) => {
    let rowBackgroundColor = darkGray ? 'bg-gray-200' : 'bg-white';
    const { days } = useContext(FirebaseContext);
    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="flex items-center w-test">
                    <div className={"w-40 flex-none sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-4 overflow-hidden flex-no-wrap " + rowBackgroundColor}>
                        <h1 className="whitespace-no-wrap">
                            {player.playerName}
                        </h1>
                    </div>
                    <PlusMinusBox rowBackgroundColor={rowBackgroundColor} player={player} key="overall" statName="Overall" />
                    {context.days != null ? context.categories.map((statName, index) => (
                        <PlusMinusBox rowBackgroundColor={rowBackgroundColor} player={player} key={index} statName={statName} />
                    )) : <h1>Loading...</h1>}
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default PlayerRow;
