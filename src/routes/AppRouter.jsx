import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './PrivateRoute';
import ClaimListing from '../pages/claims/claimsListing/ClaimsListing';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const CustomerListingScreen = lazy(() =>
 import('../pages/customerListingScreens/customerListingScreen'),
);
const NewLoginForm = lazy(() => import('../pages/newLoginForm/NewLoginForm'));
const ResetPassword = lazy(() =>
 import('../pages/resetPassword/ResetPassword'),
);
const ApiToJson = lazy(() => import('../pages/apiToJson/ApiToJson'));
const Claims = lazy(() => import('../pages/claims/Claims'));
const ClaimSettlement = lazy(() =>
 import('../pages/claimSettlement/ClaimSettlement'),
);
const CashbackProcessing = lazy(() =>
 import('../pages/cashbackProcessing/CashbackProcessing'),
);
const SurrenderProcessing = lazy(() =>
 import('../pages/surrenderProcessing/SurrenderProcessing'),
);

const AppRouter = () => {
 return (
  <div>
   <Routes>
    <Route
     path='/'
     element={
      <Suspense fallback={<div>Login</div>}>
       <NewLoginForm />
      </Suspense>
     }
    />
    <Route
     path='/login'
     element={
      <Suspense fallback={<div>Login</div>}>
       <NewLoginForm />
      </Suspense>
     }
    />
    <Route
     path='/resetpassword'
     element={
      <Suspense fallback={<div>Loading...</div>}>
       <ResetPassword />
      </Suspense>
     }
    />
    <Route element={<ProtectedRoute />}>
     <Route
      path='/claimsEntryList'
      element={
       <Suspense fallback={<div>Claim Listing...</div>}>
        <ClaimListing />
       </Suspense>
      }
     />
     <Route
      path='/surrenderprocessing'
      element={
       <Suspense fallback={<div>ClaimSettlement...</div>}>
        <SurrenderProcessing />
       </Suspense>
      }
     />
     <Route
      path='/cashbackprocessing'
      element={
       <Suspense fallback={<div>ClaimSettlement...</div>}>
        <CashbackProcessing />
       </Suspense>
      }
     />
     <Route
      path='/claimSettlement'
      element={
       <Suspense fallback={<div>ClaimSettlement...</div>}>
        <ClaimSettlement />
       </Suspense>
      }
     />
     <Route
      path='/claims'
      element={
       <Suspense fallback={<div>Claims...</div>}>
        <Claims />
       </Suspense>
      }
     />
     <Route
      path='/resetpassword_profile'
      element={
       <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
       </Suspense>
      }
     />
     <Route
      path='/Dashboard'
      element={
       <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
       </Suspense>
      }
     />

     <Route
      path='/customerList'
      element={
       <Suspense fallback={<div>Loading...</div>}>
        <CustomerListingScreen />
       </Suspense>
      }
     />
     <Route
      path='/apitojson'
      element={
       <Suspense fallback={<div>Loading...</div>}>
        <ApiToJson />
       </Suspense>
      }
     />
    </Route>
   </Routes>
  </div>
 );
};

export default AppRouter;
