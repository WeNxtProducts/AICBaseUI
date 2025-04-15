import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import ResetPassword from '../../pages/resetPassword/ResetPassword'
import NewLoginForm from '../../pages/newLoginForm/NewLoginForm'

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
        key="/resetpassword"
        path='/resetpassword'
        element={
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
            </Suspense>
        }
    />
]