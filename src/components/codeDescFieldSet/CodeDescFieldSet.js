export const maturityCodeFields = {
    PMPH_POL_NO: {
        codeVal: 'PMPH_POL_NO',
        descValSet: 'PMPH_POL_NO_DESC'
    },
    PMPH_PROD: {
        codeVal: 'PMPH_PROD',
        descValSet: 'PMPH_PROD_DESC'
    },
    PMPH_EMP_ID: {
        codeVal: 'PMPH_EMP_ID',
        descValSet: 'PMPH_EMP_ID_DESC'
    },
    PMPH_EAR_PENS_REA: {
        codeVal: 'PMPH_EAR_PENS_REA',
        descValSet: 'PMPH_EAR_PENS_REA_DESC'
    },
    PMPH_CURR_CODE: {
        codeVal: 'PMPH_CURR_CODE',
        descValSet: 'PMPH_CURR_CODE_DESC'
    },
    PMPH_CUST_CODE: {
        codeVal: 'PMPH_CUST_CODE',
        descValSet: 'PMPH_CUST_CODE_DESC'
    }
}

export const findLabel = (options, val) => {
    const currentValueObj = options?.find(item => {
        return item?.value == val;
    });
    return currentValueObj?.label
}