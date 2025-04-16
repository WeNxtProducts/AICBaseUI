import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './PrivateRoute';
import Loader from '../components/loader/Loader';
import ScrollToTop from './ScrollToTop';
import { publicRoutes } from './publicRoutes/PublicRoutes';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const MaturityProcessing = lazy(() => import('../pages/maturityProcessing/MaturityProcessing'));
const WithdrawalProcessing = lazy(() => import('../pages/withdrawalProcessing/WithdrawalProcessing'));
const YearEndProcessing = lazy(() => import('../pages/yearEndProcessing/YearEndProcessing'));
const AnnuityMaster = lazy(() => import('../pages/annuityMaster/AnnuityMaster'));
const TaxSlabSetup = lazy(() => import('../pages/taxSlabSetup/TaxSlabSetup'));
const ProductMaster = lazy(() => import('../pages/productMaster/ProductMaster'));
const GLListing = lazy(() => import('../pages/groupLife/glListing/GLListing'));
const GroupLife = lazy(() => import('../pages/groupLife/GroupLife'));
const ReInsuranceListing = lazy(() => import('../pages/ReInsurance/reInsuranceListing/ReInsuranceListing'));
const ReInsurance = lazy(() => import('../pages/ReInsurance/ReInsurance'));
const MedicalFee = lazy(() => import('../pages/medicalFee/MedicalFee'));
const SurrenderMaturity = lazy(() => import('../pages/surrenderMaturity/SurrenderMaturity'));
const EndoListing = lazy(() => import('../pages/endorsement/endoListing/EndoListing'));
const ReceiptListing = lazy(() => import('../pages/receipt/receiptListing/ReceiptListing'));
const Endorsement = lazy(() => import('../pages/endorsement/Endorsement'));
const ClaimListing = lazy(() => import('../pages/claims/claimsListing/ClaimsListing'));
const UnderWriterWorkBench = lazy(
    () => import('../pages/underWriterWorkBench/UnderWriterWorkBench'),
);
const ProductList = lazy(
    () => import('../pages/quotation/quotationListing/productList/ProductList'),
);
const Receipt = lazy(() => import('../pages/receipt/Receipt'));
const QuotationListing = lazy(() => import('../pages/quotation/quotationListing/QuotationListing'));
const Quotation = lazy(() => import('../pages/quotation/Quotation'));
const Quote = lazy(() => import('../pages/quote/Quote'));
const AutoDispatchSetUp = lazy(() => import('../pages/autoDispatchSetUp/AutoDispatchSetUp'));

const AutoDispatchListing = lazy(
    () => import('../pages/autoDispatchSetUp/autoDispatchListing/AutoDispatchListing'),
);
const ModernClaim = lazy(() => import('../pages/modernClaim/ModernClaim'));
const DocPrint = lazy(() => import('../pages/docPrint/DocPrint'));
const DocPrintListing = lazy(() => import('../pages/docPrint/docPrintListing/DocPrintListing'));
const EmailTemplate = lazy(() => import('../pages/emailTemplate/EmailTemplate'));
const EmailTemplateListing = lazy(
    () => import('../pages/emailSetUp/emailTemplateListingScreen/EmailTemplateListing'),
);
const TemplateListing = lazy(
    () => import('../pages/emailTemplate/templateListing/TemplateListing'),
);
const CustomerListingScreen = lazy(
    () => import('../pages/customerListingScreens/customerListingScreen'),
);
const ResetPassword = lazy(() => import('../pages/resetPassword/ResetPassword'));
const ApiToJson = lazy(() => import('../pages/apiToJson/ApiToJson'));
const Claim = lazy(() => import('../pages/claim/Claim'));
const ClaimSettlement = lazy(() => import('../pages/claimSettlement/ClaimSettlement'));
const CashbackProcessing = lazy(() => import('../pages/cashbackProcessing/CashbackProcessing'));
const SurrenderProcessing = lazy(() => import('../pages/surrenderProcessing/SurrenderProcessing'));
const SurrenderPayment = lazy(() => import('../pages/surrenderPayment/SurrenderPayment'));

const AppRouter = () => {
    return (
        <div>
            <ScrollToTop />
            <Routes>
                {publicRoutes}

                <Route element={<ProtectedRoute />}>
                    <Route
                        path='/glReInsuranceList'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ReInsuranceListing from='gl' />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/glReInsurance'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ReInsurance from='gl' />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/maturity_processing'
                        element={
                            <Suspense fallback={<Loader />}>
                                <MaturityProcessing />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/withdrawalProcessing'
                        element={
                            <Suspense fallback={<Loader />}>
                                <WithdrawalProcessing />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/year-end-processing'
                        element={
                            <Suspense fallback={<Loader />}>
                                <YearEndProcessing />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/endorsement'
                        element={
                            <Suspense fallback={<Loader />}>
                                <Endorsement />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/productMaster'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ProductMaster />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/taxSlabSetUp'
                        element={
                            <Suspense fallback={<Loader />}>
                                <TaxSlabSetup />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/annuityMaster'
                        element={
                            <Suspense fallback={<Loader />}>
                                <AnnuityMaster />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/reInsuranceService'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ReInsurance from='service' />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/GL_List'
                        element={
                            <Suspense fallback={<Loader />}>
                                <GLListing />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/groupLife'
                        element={
                            <Suspense fallback={<Loader />}>
                                <GroupLife />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/reInsuranceList'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ReInsuranceListing />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/reInsurance'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ReInsurance />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/medicalFee'
                        element={
                            <Suspense fallback={<Loader />}>
                                <MedicalFee />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/surrender_maturity'
                        element={
                            <Suspense fallback={<Loader />}>
                                <SurrenderMaturity />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/receiptList'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ReceiptListing />
                            </Suspense>
                        }
                    />

                    <Route
                        path='/receipt'
                        element={
                            <Suspense fallback={<Loader />}>
                                <Receipt />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/productList'
                        element={
                            <Suspense fallback={<Loader />}>
                                <ProductList />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/policyList'
                        element={
                            <Suspense fallback={<div>Listing...</div>}>
                                <QuotationListing label='Policy' search='policySearch' />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/endorsementList'
                        element={
                            <Suspense fallback={<div>Endorsement Listing...</div>}>
                                <EndoListing />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/quotationList'
                        element={
                            <Suspense fallback={<div>Listing...</div>}>
                                <QuotationListing label='Proposal' search='quotationSearch' />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/quotation/:id'
                        element={
                            <Suspense fallback={<Loader />}>
                                <Quotation />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/policy/:id'
                        element={
                            <Suspense fallback={<Loader />}>
                                <Quotation />
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
