const POST_API_URL = {
 login: {
  url: 'auth/login',
 },
 getCompList: {
  url: 'auth/getCompList',
 },
 getBranchList: {
  url: 'auth/getBranchList',
 },
 getDept: {
  url: 'auth/getDept',
 },
 getLang: {
  url: 'auth/getLang',
 },
 forgotPassword: {
  url: 'auth/forgot-password',
 },
 resetPassword: {
  url: 'auth/profile-reset',
 },
 logout: {
  url: 'auth/logout',
 },
 userCreate: {
  url: 'usermaster/createUser',
 },
 serviceToJson: {
  url: '/common/serviceToJson',
 },
 getCompanyListByUser: {
  url: '/auth/getCompyByuser',
 },
 getCompBranchDivisionList: {
  url: '/auth/companyList',
 },
 getMRVlisting: {
  url: '/common/getMrvListing',
 },
 createDept: {
  url: '/auth/deptsubmit',
 },
 deleteDept: {
  url: '/auth/deptdelete',
 },
 createCustomer: {
  url: '/customer/create',
 },
 addBranch: {
  url: '/customer/addBranch',
 },
 updateBranch: {
  url: '/customer/updateBranch',
 },
 deleteBranch: {
  url: '/customer/deleteBranch',
 },
 addCurrency: {
  url: '/customer/addCurrency',
 },
 updateCurrency: {
  url: '/customer/updateCurrency',
 },
 deleteCurrency: {
  url: '/customer/deleteCurrency',
 },
 createClaim: {
  url: '/ltclaim/claimSave',
  baseURL: 'CLAIMURL',
 },
 updateClaim: {
  url: '/ltclaim/claimUpdate',
  baseURL: 'CLAIMURL',
 },
 saveEstimate: {
  url: '/claimest/claimEstSave',
  baseURL: 'CLAIMURL',
 },
 editEstimate: {
  url: '/claimest/updateLtClaimEstimate',
  baseURL: 'CLAIMURL',
 },
 createEmail: {
  url: '/emailTemplate/createTemplate',
 },
 updateEmail: {
  url: '/emailTemplate/updateTemplate',
 },
 saveEmailParameter: {
  url: '/emailTemplate/createTemplateParam',
 },
 editEmailParameter: {
  url: '/emailTemplate/updateTemplateParam',
 },
 deleteEmailParameter: {
  url: '/emailTemplate/deleteTemplateParam',
 },
 createDoc: {
  url: '/docprintsetup/create',
  baseURL: 'DOCPRINT',
 },
 updateDoc: {
  url: '/docprintsetup/updateDocprintsetup',
  baseURL: 'DOCPRINT',
 },
 saveDocPrint: {
  url: '/docparam/create',
  baseURL: 'DOCPRINT',
 },
 editDocPrint: {
  url: '/docparam/updateDocparam',
  baseURL: 'DOCPRINT',
 },
 deleteDocPrint: {
  url: '/docparam/deletedocparambyid',
  baseURL: 'DOCPRINT',
 },
 createAutoDispatch: {
  url: '/auto-dispatch/createAutoDispatch',
 },
 updateAutoDispatch: {
  url: '/auto-dispatch/updateAutoDispDetails',
 },
 deleteAutoDispatch: {
  url: '/auto-dispatch/deleteAutoDispDetails',
 },
 claimBfcryCreate: {
  url: '/claimBfcry/claimBfcry_creates',
  baseURL: 'CLAIMURL',
 },
 claimBfcryUpdate: {
  url: '/claimBfcry/updateLtClaimBeneficiary',
  baseURL: 'CLAIMURL',
 },
 claimBfcryDelete: {
  url: '/claimBfcry/deletesclaimBfcryByid',
  baseURL: 'CLAIMURL',
 },
 claimChargeCreate: {
  url: '/claimchrgs/claimChrgsSave',
  baseURL: 'CLAIMURL',
 },
 claimChargeUpdate: {
  url: '/claimchrgs/updateClaimCharges',
  baseURL: 'CLAIMURL',
 },
 claimChargeDelete: {
  url: '/claimchrgs/deleteclaimchrgsByid',
  baseURL: 'CLAIMURL',
 },
 claimCoverCreate: {
  url: '/claimest/claimEstSave',
  baseURL: 'CLAIMURL',
 },
 claimCoverUpdate: {
  url: '/claimest/updateLtClaimEstimate',
  baseURL: 'CLAIMURL',
 },
 claimCoverDelete: {
  url: '/claimest/deleteclaimestByid',
  baseURL: 'CLAIMURL',
 },
 claimDeductionUpdate: {
  url: '/ltclaim/claimDeductionsave',
  baseURL: 'CLAIMURL',
 },
 processApproveOrReject: {
  url: '/ltclaim/saveClaimFlagDetails',
  baseURL: 'CLAIMURL',
 },
 invokeClaimsProcedure: {
  url: '/common/invokeProcedure',
 },
 modernClaimDelete: {
  url: '/ltclaim/claimHdrDelete',
  baseURL: 'CLAIMURL',
 },
 claimLevelDetailsUpdate: {
  url: '/ltclaim/saveClaimFlagDetails',
  baseURL: 'CLAIMURL',
 },
};
export default POST_API_URL;
