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
  baseURL: 'CLAIMURL',
 },
 deleteRidersDetails: {
  url: '/polEmpCover/deletePolEmpCover',
  baseURL: 'CLAIMURL',
 },
 deleteMedicalDetails: {
  url: '/medexFeeDtl/deleteMedDtl',
  baseURL: 'CLAIMURL',
 },
 deleteBeneficiaryDetails: {
  url: '/polBeneficiary/deletePolBeneficiary',
  baseURL: 'CLAIMURL',
 },
 deleteChargesDetails: {
  url: '/polCharge/deletePolCharge',
  baseURL: 'CLAIMURL',
 },
 deleteDisLoadDetails: {
  url: '/polDiscLoad/deletePolBroker',
  baseURL: 'CLAIMURL',
 },
 deleteConditionsDetails: {
  url: '',
  baseURL: 'CLAIMURL',
 },
};

export default DELETE_API_URL;
