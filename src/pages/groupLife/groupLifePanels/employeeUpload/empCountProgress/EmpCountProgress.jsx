import React from 'react';
import './EmpCountProgress.scss';

const EmpCountProgress = ({ total, completed }) => {
    const percentage = ((completed / total) * 100).toFixed(2);
    return (
        <div className="progress-bar-container">
            <div className="total-count">
                {completed} / {total}
            </div>
            <div className="progress-wrapper">
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="percentage">{percentage}%</div>
            </div>
        </div>
    );
};

export default EmpCountProgress;