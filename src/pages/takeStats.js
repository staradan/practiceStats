import React from 'react';
import QuickRecordTable from '../components/quickRecordTable/quickRecordTable';
import StatHistoryView from '../components/statHistoryView';
import NavToolbar from '../components/navToolbar';
import { Link } from 'react-router-dom';

function TakeStats() {
    // Import result is the URL of your image
    let names = [
        'Schwellenbach',
        'Gillin',
        'Rosebury',
        'Boynton'
    ];
    return (
        <div>
            <NavToolbar />
            <div className="px-4">
                <div class="flex">
                    <div class="w-full mr-2 sm:w-1/2">
                        <h1 className="font-medium">History</h1>
                        <StatHistoryView />
                    </div>
                    <Link to="/view" className="w-1/2 ml-2 hidden sm:block text-left">
                        <h1 className="font-medium">Quick Insights</h1>
                        <StatHistoryView />
                    </Link>
                </div>
                <h1 className="font-medium pt-6">Quick Record</h1>
                <QuickRecordTable />
            </div>
        </div>

    );
}
export default TakeStats;