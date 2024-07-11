const DELETE_API_URL = {
 deleteUser: {
  url: '/usermaster/delete',
 },
 deleteClaim: {
  url: '/ltclaim/deleteClaim',
  baseURL: 'CLAIMURL',
 },
 deleteEstimate: {
  url: '/claimest/deleteclaimestByid',
  baseURL: 'CLAIMURL',
 },
 deleteEmailTemplate: {
  url: '/emailTemplate/deleteTemplate',
 },
 deleteDocById: {
  url: '/docprintsetup/deletexdocbyid',
  baseURL: 'DOCPRINT',
 },
 deleteLifeAssuredDetails: {
  url: '/polEmployee/deletePolEmployee',
  baseURL: 'DOCPRINT',
 },
};

export default DELETE_API_URL;
