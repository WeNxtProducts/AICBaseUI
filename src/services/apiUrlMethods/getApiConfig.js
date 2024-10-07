const GET_API_URL = {
 getMenuList: {
  url: 'common/getMenuList',
 },
 getListing: {
  url: '/common/getlistingdata',
 },
 getFields: {
  url: '/common/getfield',
 },
 lovToJson: {
  url: '/common/lovtoJson',
 },
 getQuotation: {
  url: '/common/policyEdit',
 },
 getUserMaster: {
  url: '/common/userEdit',
 },
 getCompBranchDepartmentList: {
  url: '/common/getparamlov',
 },
 userMasterSearch: {
  url: '/common/userListSearch',
 },
 getCustomerMaster: {
  url: '/common/customerEdit',
 },
 getClaim: {
  url: '/common/claimsEdit',
 },
 getClaimEstimate: {
  url: '/common/claimsEstimatEdit',
 },
 getParamLov: {
  url: '/common/getparamlov',
 },
 getEmail: {
  url: '/emailTemplate/getTemplate',
 },
 getEmailParameter: {
  url: '/emailTemplate/getTemplateParam',
 },
 getDoc: {
  url: '/common/docPrintListEdit',
 },
 getDocPrint: {
  url: '/common/docParamListEdit',
 },
 getAutoDispatch: {
  url: '/auto-dispatch/getAutoDispDetails',
 },
 getPolicyList: {
  url: '/ltclaim/getListOfPolicies',
  baseURL: 'CRUD',
 },
 getPreClaimDate: {
  url: '/common/getMapQuery',
 },
 getClaimPayToDetailsEdit: {
  url: '/common/claimsBeneficiaryEdit',
 },
 getClaimChargesDetailsEdit: {
  url: '/common/claimsChargesEdit',
 },
 getClaimCoverDetailsEdit: {
  url: '/common/claimsEstimatEdit',
 },
 getClaimHistoryDetailsEdit: {
  url: '/common/claimsHistoryEdit',
 },
 getLovList: {
  url: '/common/getlov',
 },
 getModernClaim: {
  url: '/ltclaim/claimHdrGet',
  baseURL: 'CRUD',
 },
 getLifeAssuredDetails: {
  url: '/common/polEmployeeEdit',
 },
 getRidersDetails: {
  url: '/common/polEmpCoverEdit',
 },
 getMedicalDetails: {
  url: '/common/medicalDetailsEdit',
 },
 getChargesDetails: {
  url: '/common/polChargeEdit',
 },
 getDisLoadDetails: {
  url: '/common/polDiscLoadEdit',
 },
 getConditionsDetails: {
  url: '/common/polConditionEdit',
 },
 getBeneficiaryDetails: {
  url: '/common/polBeneficiaryEdit',
 },
 getProposalChecklist: {
  url: '/common/claimsDocToDoListEdit',
 },
 reportBuilderFormList: {
  url: '/RepotBuilder/report',
  baseURL: 'DOCPRINT',
 },
};

export default GET_API_URL;
