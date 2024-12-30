import React from 'react';
import './EmptyMessage.scss';

const EmptyMessage = ({ message, subMessage }) => {
    return (
        <div className="empty-message-container">
            <p className="message-text">{message}</p>
            {subMessage && <p className="sub-message-text">{subMessage}</p>}
        </div>
    );
};

export default EmptyMessage;
