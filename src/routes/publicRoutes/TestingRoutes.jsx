import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import MultiRowTable from '../../pages/multiRowTable/MultiRowTable'
import AgGridTables from '../../pages/claim/agGridTables/AgGridTables'
import VirtualScroll from '../../components/react-virtual/VirtualScroll'
import Loader from '../../components/loader/Loader'
import GraphSamples from '../../pages/graphSamples/GraphSamples'
import IFrameSetUp from '../../pages/iFrameSetUp/IFrameSetUp'


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