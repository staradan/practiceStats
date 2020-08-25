import React from 'react';
import QuickRecordTable from '../components/quickRecordTable/quickRecordTable';
import StatHistoryView from '../components/statHistoryView';
import Footer from '../components/footer'
import { Link } from 'react-router-dom';


function TakeStats() {
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
}
export default TakeStats;