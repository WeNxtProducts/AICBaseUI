import React from 'react';
import { FiFile } from 'react-icons/fi'; // Import an icon (e.g., from Feather Icons)
import './EmptyTable.scss';

const EmptyTable = ({ msg, searchVal }) => {
    return (
        <div className="empty_table">
            <FiFile className="icon" />
            <h2>No {msg} Found for &quot;{searchVal}&quot;</h2>
        </div>
    );
}

export default EmptyTable;
