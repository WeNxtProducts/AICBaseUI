export const mergeDropdownData = responses => {
 return responses.reduce((merged, response) => {
  for (const key in response.Data) {
   if (merged[key]) {
    merged[key] = [...merged[key], ...response.Data[key]];
   } else {
    merged[key] = response.Data[key];
   }
  }
  return merged;
 }, {});
};

export const getValQueryId = (dataArr, mainVal, keyVal) => {
 return dataArr?.reduce((acc, key) => {
  if (mainVal[key]) {
   acc[key] = mainVal[key][keyVal];
  }
  return acc;
 }, {});
};

export const extractValues = (paramsKeys, valueJson, mainKey) => {
 return paramsKeys.reduce((acc, key) => {
  for (const section in valueJson) {
   if (section === 'mrvListingId') continue;
   if (valueJson[section]?.formFields[key]) {
    acc[key] = valueJson[section].formFields[key][mainKey];
    break;
   }
  }
  return acc;
 }, {});
};
