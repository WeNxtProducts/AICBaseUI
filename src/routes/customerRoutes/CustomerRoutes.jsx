/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
const ClaimIntimationList = React.lazy(() => import('../../pages/claimIntimation/ClaimIntimationList/ClaimIntimationList'));
const ClaimIntimation = React.lazy(() => import('../../pages/claimIntimation/ClaimIntimation'));
const CusPolList = React.lazy(() => import('../../pages/CustomerPolicy/cusPolList/CusPolList'));

export const CustomerRoutes = [
    <Route
        key="/endorsementRequestList"
        path='/endorsementRequestList'
        element={
            <Suspense fallback={<Loader />}>
                <ClaimIntimationList
                    label='Endorsement Request'
                    search='searchEndorsementRequest'
                    page='/endorsementRequest'
                    delete='deleteClaimIntimation'
                />
            </Suspense>
        }
    />,
    <Route
        key="/claimIntimationList"
        path='/claimIntimationList'
        element={
            <Suspense fallback={<Loader />}>
                <ClaimIntimationList
                    label='Claim Intimation'
                    search='searchClaimIntimation'
                    page='/claimIntimation'
                    delete='deleteClaimIntimation'
                />
            </Suspense>
        }
    />,
    <Route
        key="/endorsementRequest"
        path='/endorsementRequest'
        element={
            <Suspense fallback={<Loader />}>
                <ClaimIntimation
                    typeLovId={276}
                    type='E'
                    page='/endorsementRequestList'
                />
            </Suspense>
        }
    />,
    <Route
        key="/claimIntimation"
        path='/claimIntimation'
        element={
            <Suspense fallback={<Loader />}>
                <ClaimIntimation
                    typeLovId={275}
                    type='C'
                    page='/claimIntimationList'
                />
            </Suspense>
        }
    />,
    <Route
        key="/customerPolicyList"
        path='/customerPolicyList'
        element={
            <Suspense fallback={<Loader />}>
                <CusPolList />
            </Suspense>
        }
    />
]