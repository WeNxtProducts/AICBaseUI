export const getQueryId = (queryName, data) => {
 const query = data?.find(item => item?.queryName === queryName);
 return query ? query.queryId : null;
};
