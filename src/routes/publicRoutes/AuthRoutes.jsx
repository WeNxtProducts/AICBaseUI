/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom'
const ResetPassword = React.lazy(() => import('../../pages/resetPassword/ResetPassword'));
const NewLoginForm = React.lazy(() => import('../../pages/newLoginForm/NewLoginForm'));


export const AuthRoutes = [
    <Route
        key="/login0"
        path='/'
        element={
            <Suspense fallback={<div>Login</div>}>
                <NewLoginForm />
            </Suspense>
        }
    />,
    <Route
        key="/login1"
        path='/login'
        element={
            <Suspense fallback={<div>Login</div>}>
                <NewLoginForm />
            </Suspense>
        }
    />,
    <Route
        key="/customerLogin"
        path='/customerLogin'
        element={
            <Suspense fallback={<div>Customer Login</div>}>
                <NewLoginForm />
            </Suspense>
        }
    />,
    <Route
        key="/resetpassword"
        path='/resetpassword'
        element={
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
            </Suspense>
        }
    />
]