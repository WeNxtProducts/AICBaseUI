import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './PrivateRoute';
import ClaimListing from '../pages/claims/claimsListing/ClaimsListing';
import AgGridTables from '../pages/claim/agGridTables/AgGridTables';
import UnderWriterWorkBench from '../pages/underWriterWorkBench/UnderWriterWorkBench';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Quote = lazy(() => import('../pages/quote/Quote'));
const ReportList = lazy(() => import('../pages/reportList/ReportList'));
const AutoDispatchSetUp = lazy(() =>
 import('../pages/autoDispatchSetUp/AutoDispatchSetUp'),
);

const AutoDispatchListing = lazy(() =>
 import('../pages/autoDispatchSetUp/autoDispatchListing/AutoDispatchListing'),
);
const ModernClaim = lazy(() => import('../pages/modernClaim/ModernClaim'));
const DocPrint = lazy(() => import('../pages/docPrint/DocPrint'));
const DocPrintListing = lazy(() =>
 import('../pages/docPrint/docPrintListing/DocPrintListing'),
);
const EmailTemplate = lazy(() =>
 import('../pages/emailTemplate/EmailTemplate'),
);
const EmailTemplateListing = lazy(() =>
 import('../pages/emailSetUp/emailTemplateListingScreen/EmailTemplateListing'),
);
const TemplateListing = lazy(() =>
 import('../pages/emailTemplate/templateListing/TemplateListing'),
);
const CustomerListingScreen = lazy(() =>
 import('../pages/customerListingScreens/customerListingScreen'),
);
const NewLoginForm = lazy(() => import('../pages/newLoginForm/NewLoginForm'));
const ResetPassword = lazy(() =>
 import('../pages/resetPassword/ResetPassword'),
);
const ApiToJson = lazy(() => import('../pages/apiToJson/ApiToJson'));
const Claims = lazy(() => import('../pages/claims/Claims'));
const Claim = lazy(() => import('../pages/claim/Claim'));
const ClaimSettlement = lazy(() =>
 import('../pages/claimSettlement/ClaimSettlement'),
);
const CashbackProcessing = lazy(() =>
 import('../pages/cashbackProcessing/CashbackProcessing'),
);
const SurrenderProcessing = lazy(() =>
 import('../pages/surrenderProcessing/SurrenderProcessing'),
);
const SurrenderPayment = lazy(() =>
 import('../pages/surrenderPayment/SurrenderPayment'),
);

const AppRouter = () => {
 return (
  <div>
   <Routes>
    <Route
     path='/agTable'
     element={
      <Suspense fallback={<div>AG GRID TABLE</div>}>
       <AgGridTables />
      </Suspense>
     }
    />
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

    <Route
     path='/reports'
     element={
      <Suspense fallback={<div>Report...</div>}>
       <ReportList />
      </Suspense>
     }
    />
    <Route
     path='/quote'
     element={
      <Suspense fallback={<div>QUOTE...</div>}>
       <Quote />
      </Suspense>
     }
    />

    {/* ProtectedRoute */}

    <Route element={<ProtectedRoute />}>
     <Route
      path='/quote'
      element={
       <Suspense fallback={<div>QUOTE...</div>}>
        <Quote />
       </Suspense>
      }
     />
     <Route
      path='/underwriterworkbench'
      element={
       <Suspense fallback={<div>UnderWriterWorkBench...</div>}>
        <UnderWriterWorkBench />
       </Suspense>
      }
     />

     <Route
      path='/autoDispatchSetUp'
      element={
       <Suspense fallback={<div>DocPrint SetUp...</div>}>
        <AutoDispatchSetUp />
       </Suspense>
      }
     />

     <Route
      path='/autoDispatch'
      element={
       <Suspense fallback={<div>DocPrint SetUp...</div>}>
        <AutoDispatchListing />
       </Suspense>
      }
     />

     <Route
      path='/docPrint'
      element={
       <Suspense fallback={<div>DocPrint SetUp...</div>}>
        <DocPrint />
       </Suspense>
      }
     />
     <Route
      path='/docPrintList'
      element={
       <Suspense fallback={<div>DocPrint SetUp...</div>}>
        <DocPrintListing />
       </Suspense>
      }
     />
     <Route
      path='/claim'
      element={
       <Suspense fallback={<div>Claims...</div>}>
        <Claim />
       </Suspense>
      }
     />
     <Route
      path='/emailtemplate'
      element={
       <Suspense fallback={<div>Email SetUp</div>}>
        <EmailTemplate />
       </Suspense>
      }
     />
     <Route
      path='/getTemplateList'
      element={
       <Suspense fallback={<div>Email SetUp</div>}>
        <TemplateListing />
       </Suspense>
      }
     />
     <Route
      path='/surrenderprocessing'
      element={
       <Suspense fallback={<div>surrenderprocessing...</div>}>
        <SurrenderProcessing />
       </Suspense>
      }
     />
     <Route
      path='/claims'
      element={
       <Suspense fallback={<div>Claims...</div>}>
        <ModernClaim />
       </Suspense>
      }
     />
     <Route
      path='/surrenderpayment'
      element={
       <Suspense fallback={<div>SurrenderPayment...</div>}>
        <SurrenderPayment />
       </Suspense>
      }
     />
     <Route
      path='/claimsEntryList'
      element={
       <Suspense fallback={<div>Claim Listing...</div>}>
        <ClaimListing />
       </Suspense>
      }
     />
     {/* <Route
      path='/surrenderprocessing'
      element={
       <Suspense fallback={<div>ClaimSettlement...</div>}>
        <SurrenderProcessing />
       </Suspense>
      }
     /> */}
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
