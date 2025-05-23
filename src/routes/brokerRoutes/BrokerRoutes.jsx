/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
const BrokerDashboard = lazy(() => import('../../pages/brokerDashboard/BrokerDashboard'));

export const BrokerRoutes = [
    <Route
        key="/BrokerDashboard"
        path='/brokerDashboard'
        element={
            <Suspense fallback={<Loader />}>
                <BrokerDashboard />
            </Suspense>
        }
    />,
]