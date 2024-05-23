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
};

export default DELETE_API_URL;
