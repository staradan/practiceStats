import React from 'react';
import QuickRecordTable from '../components/quickRecordTable/quickRecordTable';
import StatHistoryView from '../components/statHistoryView';
import NavToolbar from '../components/navToolbar';
import { Link } from 'react-router-dom';

function TakeStats() {
    return (
        <div>
            <NavToolbar />
            <div className="px-4 max-h-screen">
                <div class="flex">
                    <div class="w-full mr-2 sm:w-1/2">
                        <h1 className="font-medium">History</h1>
                        <StatHistoryView />
                    </div>
                </div>
                <h1 className="font-medium pt-6">Quick Record</h1>
                <QuickRecordTable />
            </div>
        </div>

    );
}
export default TakeStats;