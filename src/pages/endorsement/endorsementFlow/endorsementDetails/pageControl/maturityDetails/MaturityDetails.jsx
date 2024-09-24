import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
import { alterData } from '../../../../../../components/tableComponents/sampleData';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';
import MaturityCards from './MaturityCards';
import { CustomDatePicker, CustomSelect } from '../../../../../../components/commonExportsFields/CommonExportsFields';

const MaturityDetails = ({ currentTab, dataLoaded }) => {
    const rowData = alterData;

    useEffect(() => {
        if (dataLoaded) console.log('Maturity details ');
    }, [dataLoaded]);

    const handleNavigateToAlterations = () => {
        console.log("handleNavigateToAlterations")
    };

    return (
        <div className='alteration alter_maturity'>
            <div className='mb-5'>
                <Button
                    onClick={() => handleNavigateToAlterations()}
                    className='add-buttons-edorsement'
                    type='primary'
                    icon={<i className='bi bi-plus icon-style' />}>
                    Add New
                </Button>
            </div>
            <p className='summary_title mt-5'>Surrender/Paid up Processig</p>
            <div className='mt-2 grid grid-cols-2 items-center gap-y-3 gap-x-5'>
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-2 form-label'>Policy Number From</p>
                        <div className='col-span-3'>
                            <CustomSelect
                                name={`pol_from`}
                                options={[]}
                                showSearch={true}
                                placeholder='policy No.'
                                size='large'
                                onChange={e => {
                                    console.log(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-1 form-label'>As on date</p>
                        <div className='col-span-3'>
                            <CustomDatePicker
                                name='as_on_date'
                                placeholder='date'
                                size='large'
                                onChange={date => {
                                    console.log("date : ", date)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-2 form-label'>Surrender Type</p>
                        <div className='col-span-3'>
                            <CustomSelect
                                name={`surr_type`}
                                options={[]}
                                showSearch={true}
                                placeholder='select'
                                size='large'
                                onChange={e => {
                                    console.log(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='maturity_btn col-span-2 flex justify-center gap-3 mt-3'>
                    <Button>Print</Button>
                    <Button>Approve</Button>
                </div>
            </div>
            <Divider />
            <div className='mt-5'>
                <MaturityCards rowData={rowData} />
            </div>
        </div>
    );
};

export default MaturityDetails;
