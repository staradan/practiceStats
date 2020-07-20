import React from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function PlayerStatColumn(props) {

    return (
        <div className={"w-1/4 flex-none text-gray-700 border-gray-500 border-r text-center py-2 " + props.rowBackgroundColor}>
            <button className="inline w-4/12">
                <FontAwesomeIcon icon={faPlus} className="text-blue-500" />
            </button>
            <button className="inline w-4/12">
                <FontAwesomeIcon icon={faMinus} className="text-red-500" />
            </button>
        </div>
    );
}
export default PlayerStatColumn;