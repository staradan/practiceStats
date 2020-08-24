import React from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ManageTeam({ name }) {
    return (
        <div className="flex items-center mt-2">
            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" size="xs" />
            <h1>{name}</h1>
        </div>
    );
}
export default ManageTeam;