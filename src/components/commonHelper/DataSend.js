export const extractFieldValuesInPlace = data => {
 const traverse = obj => {
  for (const key in obj) {
   if (key === 'formFields') {
    for (const field in obj[key]) {
     obj[key][field] = obj[key][field].PFD_FLD_VALUE;
    }
   } else if (typeof obj[key] === 'object' && obj[key] !== null) {
    traverse(obj[key]);
   }
  }
 };

 traverse(data);
 return data;
};

export function deepCopy(obj) {
 const result = Array.isArray(obj) ? [] : {};
 for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
   result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
  }
 }
 return result;
}

export const reportValues = values => {
 return Object.keys(values).reduce((acc, key) => {
  acc[key] = values[key].param_Field_Value;
  return acc;
 }, {});
};

export const transformAndSortFields = fieldList => {
 return fieldList
  .sort((a, b) => a.param_Field_Order - b.param_Field_Order)
  .reduce((acc, field) => {
   acc[field.param_RepColunmName] = {
    ...field,
    param_Field_Value: '',
   };
   return acc;
  }, {});
};
