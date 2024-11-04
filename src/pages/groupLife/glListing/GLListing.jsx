import React from 'react';
import AssuredTable from './assuredTable/AssuredTable';
import './GLListing.scss';

const GLListing = () => {
    return (
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
    )
}

export default GLListing
