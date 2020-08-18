import React from 'react';
import QuickRecordTable from '../components/quickRecordTable/quickRecordTable';
import StatHistoryView from '../components/statHistoryView';
import Footer from '../components/footer'


function TakeStats() {
    return (
        <div className="mt-4">
            <div className="px-4 max-h-screen">
                <div className="flex">
                    <div className="w-full mr-2 sm:w-1/2">
                        <h1 className="font-medium">History</h1>
                        <StatHistoryView />
                    </div>
                </div>
                <h1 className="font-medium pt-6">Quick Record</h1>
                <QuickRecordTable fallback={"Loading..."} />
            </div>
            <Footer />
        </div>
    );
}
export default TakeStats;