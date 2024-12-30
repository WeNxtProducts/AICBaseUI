import React, { useContext } from 'react';
import RadioChip from '../../../../../../../../components/radioChip/RadioChip';
import { endorsementType } from '../../../../../../../../components/tableComponents/sampleData';
import { AlterationContext } from './../AlterationPages';
import ExpandableCard from './expandableCard/ExpandableCard';
import {
    nonFinanceType,
    financeType,
} from './../../../../../../../../components/tableComponents/sampleData';
import { Button } from 'antd';
import { EndorsementContext } from '../../../../../../Endorsement';

const AlterationType = () => {
    const { setShowAlteration } = useContext(EndorsementContext);
    const { alterationType, setAlterationType, setSelectedAlteration } = useContext(AlterationContext);

    const handleSelectedAlteration = item => {
        setSelectedAlteration(item);
    };

    return (
        <div className='alteration_type p-2'>
            <div className='flex flex-col items-center type_select_box'>
                <p>Select type of Endorsemet</p>
                <div className='col-span-7 mt-6'>
                    <RadioChip
                        main='endorsementType'
                        items={endorsementType}
                        selectedValue={alterationType}
                        tagSize='200'
                        onSelectionChange={val => {
                            setAlterationType(val?.value);
                        }}
                    />
                </div>
            </div>
            <ExpandableCard
                options={alterationType === 'F' ? financeType : nonFinanceType}
                handleSelectedAlteration={handleSelectedAlteration}
            />
            <div className='flex justify-center mt-5'>
                <Button className='main-back-btn' onClick={() => setShowAlteration(false)}>Back</Button>
            </div>
        </div>
    );
};

export default AlterationType;
