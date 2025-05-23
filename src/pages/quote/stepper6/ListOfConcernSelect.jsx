import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { setShowSignBox } from '../../../globalStore/slices/QuoteSlice';
import { useDispatch } from 'react-redux';

const ListOfConcernSelect = () => {
    const dispatch = useDispatch();
    const [concernOptions, setConcernOptions] = useState([
        {
            id: 'declaration',
            label: 'Declaration',
            description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            selected: false
        },
        {
            id: 'authorization',
            label: 'Authorization',
            description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            selected: false
        },
        {
            id: 'amfcmt',
            label: 'AMF/CMT Regulation',
            description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            selected: false
        }
    ]);

    const handleCheckboxChange = (e) => {
        setConcernOptions((prev) =>
            prev.map((option) =>
                option.id === e.target.name
                    ? { ...option, selected: !option.selected }
                    : option
            )
        );
    };

    useEffect(() => {
        if (concernOptions?.length > 0) {
            const allSelected = concernOptions.every(option => option.selected);
            if (allSelected)
                dispatch(setShowSignBox(true))
            else if (!allSelected)
                dispatch(setShowSignBox(false))
        }
    }, [concernOptions])
    
    return (
        <div className='concern-select-container'>
            {concernOptions.map((option) => (
                <div key={option.id} className='concern-item'>
                    <div className='checkbox-wrapper'>
                        <Checkbox
                            name={option.id}
                            checked={option?.selected}
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