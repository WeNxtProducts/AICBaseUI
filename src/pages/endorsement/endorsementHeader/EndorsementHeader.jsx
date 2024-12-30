import React from 'react';
import CustomInput from './../../../components/customFieldComponents/customInput/CustomInput';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PolicyDetails from './policyDetails/PolicyDetails';
import { useNavigate } from 'react-router-dom';

const EndorsementHeader = () => {
    const navigate = useNavigate();

    return (
        <div className='endo_header'>
            <div className='flex items-center'>
                <i
                    onClick={() => navigate('/endorsementList')}
                    className='bi bi-arrow-left-short custom-icon' />
                <p className='ml-2 top_style'>Policy History</p>
            </div>

            <div className='mt-5'>
                <PolicyDetails />
            </div>
        </div>
    );
};

export default EndorsementHeader;
