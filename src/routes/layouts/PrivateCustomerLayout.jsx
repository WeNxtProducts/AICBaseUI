import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../pages/sidebar/Sidebar';
import Header from '../../pages/header/Header';

const PrivateCustomerLayout = () => (
    <>
        <Sidebar />
        <Header />
        <main className='private_layout_main'>
            <Outlet />
        </main>
    </>
);

export default PrivateCustomerLayout;
