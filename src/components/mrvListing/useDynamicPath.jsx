import { useState, useEffect } from 'react';

const useDynamicPath = (path) => {
    const [JSONData, setJSONData] = useState(null);

    useEffect(() => {
        const importQuotationJSON = async () => {
            let quotationJSON;
            switch (path) {
                case 'TM1':
                    quotationJSON = await import('../../getFormFields/QUOTATIONENTRY_getFieldList.json');
                    break;
                case 'path2':
                    quotationJSON = await import('../../getFormFields/QUOTATIONENTRY_getFieldList.json');
                    break;
                default:
                    throw new Error(`Unknown path: ${path}`);
            }
            setJSONData(quotationJSON.default);
        };
        importQuotationJSON();
    }, []);

    return JSONData;
};

export default useDynamicPath;