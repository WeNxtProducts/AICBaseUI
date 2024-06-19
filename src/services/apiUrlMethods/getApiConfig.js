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
  url: '/common/quotationEdit',
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
  baseURL: 'CLAIMURL',
 },
};

export default GET_API_URL;
