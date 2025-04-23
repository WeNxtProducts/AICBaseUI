/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom'
const MultiRowTable = React.lazy(() => import('../../pages/multiRowTable/MultiRowTable'));
const AgGridTables = React.lazy(() => import('../../pages/claim/agGridTables/AgGridTables'));
const VirtualScroll = React.lazy(() => import('../../components/react-virtual/VirtualScroll'));
const Loader = React.lazy(() => import('../../components/loader/Loader'));
const GraphSamples = React.lazy(() => import('../../pages/graphSamples/GraphSamples'));
const IFrameSetUp = React.lazy(() => import('../../pages/iFrameSetUp/IFrameSetUp'));


export const TestingRoutes = [
    <Route
        key="multiRowTable"
        path='/multiRowTable'
        element={
            <Suspense fallback={<div>MultiRowTable</div>}>
                <MultiRowTable rowsPerPage={10} />
            </Suspense>
        }
    />,

    <Route
        key="agTable"
        path='/agTable'
        element={
            <Suspense fallback={<div>AG GRID TABLE</div>}>
                <AgGridTables />
            </Suspense>
        }
    />,
    <Route
        key="virtualscroll"
        path='/virtualscroll'
        element={
            <Suspense fallback={<div>VirtualScroll</div>}>
                <VirtualScroll />
            </Suspense>
        }
    />,
    <Route
        key="graphSamples"
        path='/graphSamples'
        element={
            <Suspense fallback={<Loader />}>
                <GraphSamples />
            </Suspense>
        }
    />,
    <Route
        key="IFrameSetUp"
        path='/userMasterLiist'
        element={
            <Suspense fallback={<div>IFrameSetUp</div>}>
                <IFrameSetUp />
            </Suspense>
        }
    />

]