import React from 'react';
import acc_emp from '../../../../../../assets/approved_emp.png';
import rej_emp from '../../../../../../assets/rejected_emp.png';
import './CountDispCard.scss';

const CountDispCard = ({ title, count }) => {
    // Helper function to format count as comma-separated
    const formatCount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="card">
            <div className="card-title">{title}</div>
            <div className="card-count">{formatCount(count)}</div> {/* Use formatted count */}
            <div className="card-icon">
                <img src={title?.includes('Approved') ? acc_emp : rej_emp} className='image_emp_count' />
            </div>
        </div>
    );
};

export default CountDispCard;
