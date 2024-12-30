import React from 'react';
import './PlanList.scss';

const PlanList = ({ checkedCards, setCheckedCards }) => {
    const cards = [
        { id: 1, title: 'Plan-1 Name' },
        { id: 2, title: 'Plan-2 Name' },
        { id: 3, title: 'Plan-3 Name' },
        { id: 4, title: 'Plan-4 Name' },
    ];

    const toggleCheckbox = (card) => {
        setCheckedCards((prevCheckedCards) => {
            // Check if the card is already in the array
            const isChecked = prevCheckedCards.some(checkedCard => checkedCard.id === card.id);

            if (isChecked) {
                // If it is, remove it
                return prevCheckedCards.filter(checkedCard => checkedCard.id !== card.id);
            } else {
                // If it's not, add it
                return [...prevCheckedCards, card];
            }
        });
    };

    return (
        <div className="plan-list">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className={`plan-card ${checkedCards.some(checkedCard => checkedCard.id === card.id) ? 'checked' : ''}`}
                    onClick={() => toggleCheckbox(card)}
                >
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={checkedCards.some(checkedCard => checkedCard.id === card.id)}
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
