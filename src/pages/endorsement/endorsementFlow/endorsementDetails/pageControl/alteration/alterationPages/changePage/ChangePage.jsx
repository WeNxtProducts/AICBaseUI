import React, { useContext, useEffect } from 'react';
import PageHeader from './PageHeader';
import { AlterationContext } from '../AlterationPages';
import PremiumChange from './premiumChange/PremiumChange';
import SAChange from './SAChange/SAChange';
import MOPChange from './MOPChange/MOPChange';
import Cancellation from './cancellation/Cancellation';
import AddtionDeletionRider from './addtionDeletionRider/AddtionDeletionRider';
import BasicInfoChange from './basicInfoChange/BasicInfoChange';

const ChangePage = () => {
    const { alterationType, selectedAlteration } = useContext(AlterationContext);

    useEffect(() => {
        if (selectedAlteration) {
            console.log('selectedAlteration : ', selectedAlteration);
        }
    }, [selectedAlteration]);

    return (
        <div className='change_page'>
            <PageHeader />
            <div className='multi-pages'>
                {selectedAlteration?.key === 0 && <PremiumChange />}
                {selectedAlteration?.key === 1 && <PremiumChange />}
                {selectedAlteration?.key === 2 && <MOPChange />}
                {selectedAlteration?.key === 3 && <AddtionDeletionRider />}
                {selectedAlteration?.key === 4 && <Cancellation />}
                {selectedAlteration?.key === 5 && <MOPChange />}
                {selectedAlteration?.key === 6 && <BasicInfoChange />}
            </div>
        </div>
    );
};

export default ChangePage;
