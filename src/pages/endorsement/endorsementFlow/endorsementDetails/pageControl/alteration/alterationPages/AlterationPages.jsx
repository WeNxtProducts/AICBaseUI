import React, { useContext, useEffect, useState, createContext } from 'react';
import { EndorsementContext } from '../../../../../Endorsement';
import AlterationType from './alterationType/AlterationType';
import ChangePage from './changePage/ChangePage';

export const AlterationContext = createContext();

const AlterationPages = () => {
    const { setShowAlteration, showAlteration } = useContext(EndorsementContext);
    const [alterationType, setAlterationType] = useState('F');
    const [selectedAlteration, setSelectedAlteration] = useState({
        key: 6,
        title: 'Change Basic Info',
        desc: 'User Can change the basic info of the policy.',
        option: false,
    },);

    const data = {
        alterationType,
        setAlterationType,
        setSelectedAlteration,
        selectedAlteration,
    };

    return (
        <AlterationContext.Provider value={data}>
            <div className='alterationPages'>
                {selectedAlteration === null ? <AlterationType /> : <ChangePage />}
                {/* <AlterationType />  */}
            </div>
        </AlterationContext.Provider>
    );
};

export default AlterationPages;
