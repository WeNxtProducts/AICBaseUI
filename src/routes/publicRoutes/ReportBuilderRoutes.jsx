import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import Report from '../../pages/report/Report'

export const ReportBuilderRoutes = [
    <Route
        key="rep1"
        path='/rep1'
        element={
            <Suspense fallback={<div>Report</div>}>
                <Report />
            </Suspense>
        }
    />
]