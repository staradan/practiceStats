import React from 'react';
import HomeToolbar from '../components/homeToolbar';
import QuickViewPlayerCard from '../components/quickViewPlayerCard';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div>
            <div className="absolute top-0">
                <HomeToolbar />
            </div>
            <div className="text-center mt-32 border-b pb-4">
                <Link to="/take"><button className="block m-auto my-3 bg-gray-300 w-3/5 py-4 font-medium">Take Stats</button></Link>
                <Link to="/view"><button className="block m-auto my-3 bg-gray-300 w-3/5 py-4 font-medium">View Insights</button></Link>
                <Link to="/manage"><button className="block m-auto my-3 bg-gray-300 w-3/5 py-4 font-medium">Manage Team</button></Link>
            </div>
            <div className="mx-4 mt-6">
                <h1 className="font-bold">Leaderboard  <span className="text-gray-600 text-sm font-normal">4/13/20</span></h1>
                <div className="my-3">
                    <button className="mr-4 bg-red-500 rounded py-1 px-2 text-sm">Overall</button>
                    <button className="mr-4 rounded py-1 px-2 text-sm">Fielding</button>
                    <button className="mr-4 rounded py-1 px-2 text-sm">Throwing</button>
                </div>
                <div className="mt-2 overflow-y-auto">
                    <QuickViewPlayerCard rank="1" name="Spencer Schwellenbach" percent="94" positive="123" negative="8"/>
                    <QuickViewPlayerCard rank="2" name="Dan The Man" percent="93" positive="110" negative="9"/>
                    <QuickViewPlayerCard rank="3" name="Jaxon Hallmark" percent="90" positive="106" negative="11"/>
                    <QuickViewPlayerCard rank="4" name="Lou Gehrig" percent="88" positive="130" negative="30"/>
                    <QuickViewPlayerCard rank="1" name="Spencer Schwellenbach" percent="94" positive="123" negative="8"/>
                    <QuickViewPlayerCard rank="2" name="Dan The Man" percent="93" positive="110" negative="9"/>
                    <QuickViewPlayerCard rank="3" name="Jaxon Hallmark" percent="90" positive="106" negative="11"/>
                    <QuickViewPlayerCard rank="4" name="Lou Gehrig" percent="88" positive="130" negative="30"/>
                </div>
            </div>
        </div>
    );
}

export default Home;
