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
 },
};
export default POST_API_URL;
