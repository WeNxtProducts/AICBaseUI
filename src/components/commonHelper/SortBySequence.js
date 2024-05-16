export function sortObjectByPFDSeqNo(obj) {
 if (!isObject(obj)) {
  return obj;
 }

 const sortedObj = {};
 for (const key in obj) {
  if (Array.isArray(obj[key])) {
   sortedObj[key] = obj[key].map(sortObjectByPFDSeqNo);
  } else if (isObject(obj[key]) && key === 'formFields') {
   sortedObj[key] = Object.fromEntries(
    Object.entries(obj[key]).sort((a, b) => a[1].PFD_SEQ_NO - b[1].PFD_SEQ_NO),
   );
  } else {
   sortedObj[key] = sortObjectByPFDSeqNo(obj[key]);
  }
 }
 return sortedObj;
}

function isObject(value) {
 return typeof value === 'object' && value !== null;
}
