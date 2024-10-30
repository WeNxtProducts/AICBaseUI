import React, { useState } from 'react';
import './PlanList.scss';

const PlanList = () => {
    const cards = [
        { id: 1, title: 'Plan-1 Name' },
        { id: 2, title: 'Plan-2 Name' },
        { id: 3, title: 'Plan-3 Name' },
        { id: 4, title: 'Plan-4 Name' },
    ];

    const [checkedCards, setCheckedCards] = useState({});

    const toggleCheckbox = (id) => {
        setCheckedCards((prevCheckedCards) => ({
            ...prevCheckedCards,
            [id]: !prevCheckedCards[id],
        }));
    };

    return (
        <div className="plan-list">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className={`plan-card ${checkedCards[card.id] ? 'checked' : ''}`}
                    onClick={() => toggleCheckbox(card.id)}
                >
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={!!checkedCards[card.id]}
                            onChange={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <span className="plan-title">{card.title}</span>
                </div>
            ))}
        </div>
    );
};

export default PlanList;
