import { useState, useEffect } from 'react';

const useDynamicPath = (path) => {
    const [JSONData, setJSONData] = useState(null);

    useEffect(() => {
        const importQuotationJSON = async () => {
            const quotationJSON = await import(path);
            setJSONData(quotationJSON.default);
        };
        importQuotationJSON();
    }, []);

    return JSONData;
};

export default useDynamicPath;