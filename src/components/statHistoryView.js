import React from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatHistoryView() {
    // Import result is the URL of your image
    let names = [
        'Schwellenbach',
        'Gillin',
        'Rosebury',
        'Boynton'
    ];
    return (
        <div className="bg-gray-200 w-full text-center px-5 py-10 max-height-48 overflow-y-scroll rounded-md">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" size="5x" />
            <h1>No Stats to Display</h1>
        </div>
    );
}
export default StatHistoryView;