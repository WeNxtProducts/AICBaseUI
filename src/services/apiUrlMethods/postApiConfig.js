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
 updateCoverAmount: {
  url: '/claimPaid/save',
  baseURL: 'CLAIMURL',
 },
 saveProposalEntry: {
  url: '/policy/save',
  baseURL: 'CLAIMURL',
 },
 updateProposalEntry: {
  url: '/policy/policyUpdate',
  baseURL: 'CLAIMURL',
 },
 saveLifeAssuredDetails: {
  url: '/polEmployee/save',
  baseURL: 'CLAIMURL',
 },
 updateLifeAssuredDetails: {
  url: '/polEmployee/polEmployeeUpdate',
  baseURL: 'CLAIMURL',
 },
 saveRidersDetails: {
  url: '/polEmpCover/save',
  baseURL: 'CLAIMURL',
 },
 updateRidersDetails: {
  url: '/polEmpCover/polEmpCoverUpdate',
  baseURL: 'CLAIMURL',
 },
 saveMedicalDetails: {
  url: '/medexFeeDtl/save',
  baseURL: 'CLAIMURL',
 },
 updateMedicalDetails: {
  url: '/medexFeeDtl/updateMedExFeeDtl',
  baseURL: 'CLAIMURL',
 },

 saveBeneficiaryDetails: {
  url: '/polBeneficiary/save',
  baseURL: 'CLAIMURL',
 },
 updateBeneficiaryDetails: {
  url: '/polBeneficiary/polBeneficiaryUpdate',
  baseURL: 'CLAIMURL',
 },
 saveChargesDetails: {
  url: '/polCharge/save',
  baseURL: 'CLAIMURL',
 },
 updateChargesDetails: {
  url: '/polCharge/polChargeUpdate',
  baseURL: 'CLAIMURL',
 },
 saveDisLoadDetails: {
  url: '/polDiscLoad/save',
  baseURL: 'CLAIMURL',
 },
 updateDisLoadDetails: {
  url: '/polDiscLoad/polDiscLoadUpdate',
  baseURL: 'CLAIMURL',
 },
 saveConditionsDetails: {
  url: '/condition/save',
  baseURL: 'CLAIMURL',
 },
 updateConditionsDetails: {
  url: '/condition/update',
  baseURL: 'CLAIMURL',
 },
 updateProposalChecklistFlag: {
  url: 'docToDoList/statusFlagUpdate',
  baseURL: 'CLAIMURL',
 },
 updateProposalChecklistFlagBulk: {
  url: 'docToDoList/statusFlagBulkUpdate',
  baseURL: 'CLAIMURL',
 },
 updateProposalStepperStatus: {
  url: '/policy/updateStepperFlag',
  baseURL: 'CLAIMURL',
 },
 updateProposalFreezeStatus: {
  url: '/policy/updateFreezeFlag',
  baseURL: 'CLAIMURL',
 },
 DMSFileUpload: {
  url: '/dms/uploadMultiple',
  baseURL: 'DOCPRINT',
 },
 DMSView: {
  url: '/dms/view',
  baseURL: 'DOCPRINT',
 },
 DMSDelete: {
  url: '/dms/deleteFiles',
  baseURL: 'DOCPRINT',
 },
};

export default POST_API_URL;
