/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom'
const Report = lazy(() => import('../../pages/report/Report'));

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