import React, { useContext } from 'react';
import PlusMinusBox from './posNegViewBox';
import { FirebaseContext } from '../../firebase'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuickRecordTable = () => {
    const { players, categories, viewOnlyStats } = useContext(FirebaseContext);

    // useEffect(() => {

    //     console.log('players', players);

    //     players.forEach(playerName => {
    //         setStatsObj({
    //             ...statsObj,
    //             'hey': 'hey',
    //         });
    //         console.log('here');

    //         // statsObj[playerName] = {
    //         //     positive: [],
    //         //     negative: [],
    //         // };
    //     });

    //     console.log(statsObj);


    // }, []);

    // //break the stats up into player arrays we can work with
    // //calculate team totals and player arrays
    // stats.forEach(stat => {
    //     if (stat.isPositive) {
    //         statsObj.allPositive.push(stat);
    //         statsObj[stat.playerName].positive.push(stat);
    //     } else {
    //         statsObj.allNegative.push(stat);
    //         statsObj[stat.playerName].negative.push(stat);
    //     }
    // });

    // const [form, setState] = useState({
    //     username: '',
    //     password: ''
    //   });

    var sortable = [];

    if (viewOnlyStats) {
        for (var player in viewOnlyStats) {
            sortable.push([player, viewOnlyStats[player]]);
        }
    }

    console.log(sortable);

    sortable.sort((a, b) => {
        let firstNum = parseFloat(a[1].successPercent) || 0;
        let secondNum = parseFloat(b[1].successPercent) || 0;
        let name = b[0];
        console.log(name);
        return (name === 'Overall' ? -1 : firstNum < secondNum ? 1 : -1)
    });

    console.log(sortable);



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
                        {sortable.length > 0 ? sortable.map((player, num) => (
                            <div key={num} className="flex items-center w-view">
                                <div className={"w-40 flex-none sticky left-0 flex-none border-gray-600 border-r-2 text-gray-700 text-left px-4 py-4 overflow-hidden flex-no-wrap " + (num % 2 === 0 ? 'bg-gray-200' : 'bg-white')}>
                                    <h1 className="whitespace-no-wrap">
                                        {player[0]}
                                    </h1>
                                </div>
                                <PlusMinusBox rowBackgroundColor={(num % 2 === 0 ? 'bg-gray-200' : 'bg-white')} player={player[0]} key="overall" num={num} statName="Overall" />
                                {categories != null ? categories.map((category, index) => (
                                    <PlusMinusBox rowBackgroundColor={(num % 2 === 0 ? 'bg-gray-200' : 'bg-white')} player={player[0]} key={index} statName={category} />
                                )) : <div><FontAwesomeIcon icon={faSpinner} size="2x" /><h1>Loading...</h1></div>}
                            </div>
                        )) : <div>Loading...</div>}
                    </div>
                </div>
            )}
        </FirebaseContext.Consumer>
    );
}

export default QuickRecordTable;