import React, { useState } from 'react';
import QuickRecordTable from '../components/quickRecordTable/quickRecordTable';
import StatHistoryView from '../components/statHistoryView';
import Footer from '../components/footer'
import { Link } from 'react-router-dom';

function TakeStats() {
    const [password, setPassword] = useState('6969');

    if (password === '6969') {
        return (
            <div className="mt-4 px-4">
                <div className="max-h-screen mb-8">
                    <div className="flex">
                        <div className="w-full mr-2">
                            <h1 className="font-medium">History</h1>
                            <StatHistoryView />
                        </div>
                    </div>
                    <h1 className="font-medium pt-6">Quick Record</h1>
                    <QuickRecordTable fallback={"Loading..."} />
                </div>
                <Link to="/manage" className="font-bold text-right text-blue-600"><h1>Add More Players</h1></Link>
                <Footer />
            </div>
        );
    } else {
        return (
            <div>
                <form className="w-1/2 bg-white rounded shadow mt-40 p-4 text-center m-auto">
                    <input
                        className="border-b text-center w-2/3"
                        placeholder="Enter Password To Take Stats"
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </form>
                <Footer />
            </div >
        )
    }
}
export default TakeStats;