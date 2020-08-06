import React from 'react';
import HomeToolbar from '../components/homeToolbar';
import QuickViewPlayerCard from '../components/quickViewPlayerCard';
import Footer from '../components/footer'


function Home() {
    return (
        <div>
            <div className="absolute top-0">
                <HomeToolbar />
            </div>
            <div className="mx-4 mt-24">
                <h1 className="font-bold">Efficiency Leaderboard  <span className="text-gray-600 text-sm font-normal">4/13/20</span></h1>
                <div className="my-3">
                    <button className="mr-4 bg-gray-300 rounded py-1 px-2 text-sm">Overall</button>
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
            <div className="mx-4 mt-6">
                <h1 className="font-bold">Team Efficiency <span className="text-gray-600 text-sm font-normal">4/13/20</span></h1>
            </div>
            <Footer />
        </div>

    );
}

export default Home;
