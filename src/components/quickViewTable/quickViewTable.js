import React, { useContext } from 'react';
import PlusMinusBox from './posNegViewBox';
import { FirebaseContext } from '../../firebase'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import messages from '../../assets/loadingMessages'

const QuickRecordTable = () => {
    const { categories, stats, viewOnlyStats } = useContext(FirebaseContext);

    var sortable = [];

    console.log('list', stats);

    if (viewOnlyStats) {
        for (var player in viewOnlyStats) {
            sortable.push([player, viewOnlyStats[player]]);
        }
    }

    //sort by percentages and then break ties by counting number of 
    sortable.sort((a, b) => {
        let firstPerc = parseFloat(a[1].successPercent) || 0;
        let secondPerc = parseFloat(b[1].successPercent) || 0;

        let firstPosLength = parseFloat(a[1].positive.length) || 0;
        let secondPosLength = parseFloat(b[1].positive.length) || 0;

        return (b[0] === 'Overall' ? -1 : secondPerc - firstPerc || secondPosLength - firstPosLength)
    });




    return (
        <FirebaseContext.Consumer>
            {(context) => (
                <div className="rounded-sm border border-gray-400 shadow relative w-full overflow-auto bg-gray-300">
                    <div className="relative flex items-center w-view">
                        <div className="w-48 sticky left-0 flex-none font-semibold text-sm text-gray-700 bg-gray-400 border-gray-600 border-r-2 text-left px-4 big-width">Name</div>
                        <div className="w-48 whitespace-no-wrap flex-none font-semibold text-center text-sm text-gray-700 bg-gray-400 px-2 overflow-hidden">Overall</div>
                        {categories != null ? categories.map((statName, index) => (
                            <div key={index} className="w-48 whitespace-no-wrap flex-none font-semibold text-center text-sm text-gray-700 bg-gray-400 px-2 overflow-hidden">{statName}</div>
                        )) : <h1>Loading...</h1>}
                    </div>
                    <div>
                        {sortable.length > 0 ? sortable.map((player, num) => (
                            <div key={num} className={"flex items-center w-view " + (player[0] === 'Overall' ? 'border-gray-600 border-t-2 bg-gray-600' : '')}>
                                <div className={"w-48 flex-none sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-4 overflow-hidden flex-no-wrap " + (num % 2 === 0 ? 'bg-gray-200' : 'bg-white')}>
                                    <h1 className="whitespace-no-wrap">
                                        {player[0]}
                                    </h1>
                                </div>
                                <PlusMinusBox rowBackgroundColor={(num % 2 === 0 ? 'bg-gray-200' : 'bg-white')} player={player[0]} key="overall" num={num} statName="Overall" />
                                {categories != null ? categories.map((category, index) => (
                                    <PlusMinusBox rowBackgroundColor={(num % 2 === 0 ? 'bg-gray-200' : 'bg-white')} player={player[0]} key={index} statName={category} />
                                )) : <div><FontAwesomeIcon icon={faSearch} size="2x" /><h1>Loading...</h1></div>}
                            </div>
                        )) : <div className="text-center p-12">
                                <FontAwesomeIcon icon={faSearch} size="2x" />
                                <h1>{messages[Math.floor(Math.random() * messages.length)]}</h1>
                            </div>}
                    </div>
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default QuickRecordTable;