/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
const GroupLifeQuote = lazy(() => import('../../pages/groupLifeQuote/GroupLifeQuote'));
const QuoteSelect = lazy(() => import('../../pages/quoteSelect/QuoteSelect'));
const QuoteProductList = lazy(() => import('../../components/quoteProdListing/QuoteProductList'));
const Quote = lazy(() => import('../../pages/quote/Quote'));
const ClaimIntimationList = lazy(() => import('../../pages/claimIntimation/ClaimIntimationList/ClaimIntimationList'));
const ClaimIntimation = lazy(() => import('../../pages/claimIntimation/ClaimIntimation'));
const CusPolList = lazy(() => import('../../pages/CustomerPolicy/cusPolList/CusPolList'));

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
    />,
    <Route
        key="/broQuoteSelect"
        path='/broQuoteSelect'
        element={
            <Suspense fallback={<Loader />}>
                <QuoteSelect from='B' next='/broQuoteProducts' />
            </Suspense>
        }
    />,
    <Route
        key="/broQuoteProducts"
        path='/broQuoteProducts'
        element={
            <Suspense fallback={<Loader />}>
                <QuoteProductList from='B' ILnext='/broQuote' GLnext='/broGroupLifeQuote' />
            </Suspense>
        }
    />,
    <Route
        key="broQuote"
        path='/broQuote'
        element={
            <Suspense fallback={<Loader />}>
                <Quote from='B' next='/login' back='/broQuoteSelect' />
            </Suspense>
        }
    />,
    <Route
        key="broGroupLifeQuote"
        path='/broGroupLifeQuote'
        element={
            <Suspense fallback={<Loader />}>
                <GroupLifeQuote from='B' next='/login' back='/broQuoteSelect' />
            </Suspense>
        }
    />
]