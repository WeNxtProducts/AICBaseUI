import React, { createContext, useState } from 'react';
import AssuredTable from './assuredTable/AssuredTable';
import GroupLifeJSON from '../../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import GroupLifeLov from '../../../getFormFields/QUOTATIONENTRY_getLOVList.json';
import './GLListing.scss';

export const GLListContext = createContext();

const GLListing = () => {
    const [dropDown, setDropDown] = useState(GroupLifeLov);

    const data = {
        GroupLifeJSON, GroupLifeLov,
        dropDown, setDropDown
    }
    return (
        <GLListContext.Provider value={data}>
            <div className='GL_List'>
                <div className='table_details'>
                    <p>Employee Details</p>
                    <p>Total Record : <span>9,459</span></p>
                </div>
                <hr className='main_divider' />
                <div className=''>
                    <AssuredTable />
                </div>
            </div>
        </GLListContext.Provider>
    )
}

export default GLListing
