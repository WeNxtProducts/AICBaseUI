import React from 'react';
import { FiFile } from 'react-icons/fi'; // Import an icon (e.g., from Feather Icons)
import './EmptyTable.scss';

const EmptyTable = ({ msg }) => {
    return (
        <div className="empty_table">
            <FiFile className="icon" />
            <h2>No {msg} Available</h2>
        </div>
    );
}

export default EmptyTable;
