import React from 'react';
import HomeToolbar from '../components/homeToolbar';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="">
            <div className="absolute top-0">
                <HomeToolbar />
            </div>
            <div className="text-center mt-48">
                <Link to="/take"><button className="block m-auto my-3 bg-gray-300 w-3/5 py-4 font-medium">Take Stats</button></Link>
                <Link to="/view"><button className="block m-auto my-3 bg-gray-300 w-3/5 py-4 font-medium">View Insights</button></Link>
                <Link to="/manage"><button className="block m-auto my-3 bg-gray-300 w-3/5 py-4 font-medium">Manage Team</button></Link>
            </div>
        </div>
    );
}

export default Home;
