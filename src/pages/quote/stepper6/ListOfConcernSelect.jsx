import React, { useState } from 'react';
import { Checkbox } from 'antd';

const ListOfConcernSelect = () => {
    // State to track which checkboxes are checked
    const [checkedItems, setCheckedItems] = useState({
        declaration: false,
        authorization: false,
        regulation: false
    });

    // Handler for checkbox changes
    const handleCheckboxChange = (e) => {
        setCheckedItems({
            ...checkedItems,
            [e.target.name]: e.target.checked
        });
    };

    // Concern options with their labels
    const concernOptions = [
        {
            id: 'declaration',
            label: 'Declaration',
            description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            id: 'authorization',
            label: 'Authorization',
            description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            id: 'amfcmt',
            label: 'AMF/CMT Regulation',
            description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        }
    ];

    return (
        <div className='concern-select-container'>
            {concernOptions.map((option) => (
                <div key={option.id} className='concern-item'>
                    <div className='checkbox-wrapper'>
                        <Checkbox
                            name={option.id}
                            checked={checkedItems[option.id]}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div className='concern-content'>
                        <div className='concern-label'>{option.label}</div>
                        <div className='concern-description'>{option.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListOfConcernSelect;