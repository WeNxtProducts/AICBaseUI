const DELETE_API_URL = {
 deleteUser: {
  url: '/usermaster/delete',
 },
 deleteClaim: {
  url: '/ltclaim/deleteClaim',
  baseURL: 'CRUD',
 },
 deleteEstimate: {
  url: '/claimest/deleteclaimestByid',
  baseURL: 'CRUD',
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
  baseURL: 'CRUD',
 },
 deleteRidersDetails: {
  url: '/polEmpCover/deletePolEmpCover',
  baseURL: 'CRUD',
 },
 deleteMedicalDetails: {
  url: '/medexFeeDtl/deleteMedDtl',
  baseURL: 'CRUD',
 },
 deleteBeneficiaryDetails: {
  url: '/polBeneficiary/deletePolBeneficiary',
  baseURL: 'CRUD',
 },
 deleteChargesDetails: {
  url: '/polCharge/deletePolCharge',
  baseURL: 'CRUD',
 },
 deleteDisLoadDetails: {
  url: '/polDiscLoad/deletePolBroker',
  baseURL: 'CRUD',
 },
 deleteConditionsDetails: {
  url: '/condition/delete',
  baseURL: 'CRUD',
 },
 deleteProposal: {
  url: '/policy/deletePolicy',
  baseURL: 'CRUD',
 },
};

export default DELETE_API_URL;
