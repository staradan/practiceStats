import React, { useContext } from 'react';
import PlusMinusBox from './posNegViewBox';
import { FirebaseContext } from '../../firebase'

const QuickRecordTable = () => {
    const { players, categories } = useContext(FirebaseContext);
    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="rounded-sm border border-gray-400 shadow relative w-full overflow-auto bg-gray-300">
                    <div className="relative flex items-center w-view">
                        <div className="w-40 sticky left-0 flex-none font-semibold text-sm text-gray-700 bg-gray-400 border-gray-600 border-r-2 text-left px-4 big-width">Name</div>
                        <div className="w-40 whitespace-no-wrap flex-none font-semibold text-center text-sm text-gray-700 bg-gray-400 px-2 overflow-hidden">Overall</div>
                        {categories != null ? categories.map((statName, index) => (
                            <div key={index} className="w-40 whitespace-no-wrap flex-none font-semibold text-center text-sm text-gray-700 bg-gray-400 px-2 overflow-hidden">{statName}</div>
                        )) : <h1>Loading...</h1>}
                    </div>
                    <div>
                        {players.length > 0 ? players.map((player, num) => (
                            <div key={num} className="flex items-center w-view">
                                <div className={"w-40 flex-none sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-4 overflow-hidden flex-no-wrap " + (num % 2 === 0 ? 'bg-gray-200' : 'bg-white')}>
                                    <h1 className="whitespace-no-wrap">
                                        {player.playerName}
                                    </h1>
                                </div>
                                <PlusMinusBox rowBackgroundColor={(num % 2 === 0 ? 'bg-gray-200' : 'bg-white')} player={player} key="overall" statName="Overall" />
                                {categories != null ? categories.map((category, index) => (
                                    <PlusMinusBox rowBackgroundColor={(num % 2 === 0 ? 'bg-gray-200' : 'bg-white')} player={player} key={index} statName={category} />
                                )) : <h1>Loading...</h1>}
                            </div>
                        )) : <div>Loading...</div>}
                    </div>
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default QuickRecordTable;