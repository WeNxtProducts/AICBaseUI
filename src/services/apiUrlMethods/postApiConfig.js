const POST_API_URL = {
    login: {
        url: 'auth/login',
    },
    getCompList: {
        url: 'auth/getCompList',
    },
    getBranchList: {
        url: 'auth/getBranchList',
    },
    getDept: {
        url: 'auth/getDept',
    },
    getLang: {
        url: 'auth/getLang',
    },
    forgotPassword: {
        url: 'auth/forgot-password',
    },
    resetPassword: {
        url: 'auth/profile-reset',
    },
    logout: {
        url: 'auth/logout',
    },
    userCreate: {
        url: 'usermaster/createUser',
    },
    serviceToJson: {
        url: '/common/serviceToJson',
    },
    getCompanyListByUser: {
        url: '/auth/getCompyByuser',
    },
    getCompBranchDivisionList: {
        url: '/auth/companyList',
    },
    getMRVlisting: {
        url: '/common/getMrvListing',
    },
    getMRVlistingPayload: {
        url: '/common/newMrvListing',
    },
    createDept: {
        url: '/auth/deptsubmit',
    },
    deleteDept: {
        url: '/auth/deptdelete',
    },
    createCustomer: {
        url: '/customer/create',
    },
    addBranch: {
        url: '/customer/addBranch',
    },
    updateBranch: {
        url: '/customer/updateBranch',
    },
    deleteBranch: {
        url: '/customer/deleteBranch',
    },
    addCurrency: {
        url: '/customer/addCurrency',
    },
    updateCurrency: {
        url: '/customer/updateCurrency',
    },
    deleteCurrency: {
        url: '/customer/deleteCurrency',
    },
    createClaim: {
        url: '/ltclaim/claimSave',
        baseURL: 'CRUD',
    },
    updateClaim: {
        url: '/ltclaim/claimUpdate',
        baseURL: 'CRUD',
    },
    saveEstimate: {
        url: '/claimest/claimEstSave',
        baseURL: 'CRUD',
    },
    editEstimate: {
        url: '/claimest/updateLtClaimEstimate',
        baseURL: 'CRUD',
    },
    createEmail: {
        url: '/emailTemplate/createTemplate',
    },
    updateEmail: {
        url: '/emailTemplate/updateTemplate',
    },
    saveEmailParameter: {
        url: '/emailTemplate/createTemplateParam',
    },
    editEmailParameter: {
        url: '/emailTemplate/updateTemplateParam',
    },
    deleteEmailParameter: {
        url: '/emailTemplate/deleteTemplateParam',
    },
    createDoc: {
        url: '/docprintsetup/create',
        baseURL: 'DOCPRINT',
    },
    updateDoc: {
        url: '/docprintsetup/updateDocprintsetup',
        baseURL: 'DOCPRINT',
    },
    saveDocPrint: {
        url: '/docparam/create',
        baseURL: 'DOCPRINT',
    },
    editDocPrint: {
        url: '/docparam/updateDocparam',
        baseURL: 'DOCPRINT',
    },
    deleteDocPrint: {
        url: '/docparam/deletedocparambyid',
        baseURL: 'DOCPRINT',
    },
    createAutoDispatch: {
        url: '/auto-dispatch/createAutoDispatch',
    },
    updateAutoDispatch: {
        url: '/auto-dispatch/updateAutoDispDetails',
    },
    deleteAutoDispatch: {
        url: '/auto-dispatch/deleteAutoDispDetails',
    },
    claimBfcryCreate: {
        url: '/claimBfcry/claimBfcry_creates',
        baseURL: 'CRUD',
    },
    claimBfcryUpdate: {
        url: '/claimBfcry/updateLtClaimBeneficiary',
        baseURL: 'CRUD',
    },
    claimBfcryDelete: {
        url: '/claimBfcry/deletesclaimBfcryByid',
        baseURL: 'CRUD',
    },
    claimChargeCreate: {
        url: '/claimchrgs/claimChrgsSave',
        baseURL: 'CRUD',
    },
    claimChargeUpdate: {
        url: '/claimchrgs/updateClaimCharges',
        baseURL: 'CRUD',
    },
    claimChargeDelete: {
        url: '/claimchrgs/deleteclaimchrgsByid',
        baseURL: 'CRUD',
    },
    claimCoverCreate: {
        url: '/claimest/claimEstSave',
        baseURL: 'CRUD',
    },
    claimCoverUpdate: {
        url: '/claimest/updateLtClaimEstimate',
        baseURL: 'CRUD',
    },
    claimCoverDelete: {
        url: '/claimest/deleteclaimestByid',
        baseURL: 'CRUD',
    },
    claimDeductionUpdate: {
        url: '/ltclaim/claimDeductionsave',
        baseURL: 'CRUD',
    },
    processApproveOrReject: {
        url: '/ltclaim/saveClaimFlagDetails',
        baseURL: 'CRUD',
    },
    invokeClaimsProcedure: {
        url: '/common/invokeProcedure',
    },
    modernClaimDelete: {
        url: '/ltclaim/claimHdrDelete',
        baseURL: 'CRUD',
    },
    claimLevelDetailsUpdate: {
        url: '/ltclaim/saveClaimFlagDetails',
        baseURL: 'CRUD',
    },
    updateCoverAmount: {
        url: '/claimPaid/save',
        baseURL: 'CRUD',
    },
    saveProposalEntry: {
        url: '/policy/save',
        baseURL: 'CRUD',
    },
    updateProposalEntry: {
        url: '/policy/policyUpdate',
        baseURL: 'CRUD',
    },
    saveLifeAssuredDetails: {
        url: '/polEmployee/save',
        baseURL: 'CRUD',
    },
    updateLifeAssuredDetails: {
        url: '/polEmployee/polEmployeeUpdate',
        baseURL: 'CRUD',
    },
    saveRidersDetails: {
        url: '/polEmpCover/save',
        baseURL: 'CRUD',
    },
    updateRidersDetails: {
        url: '/polEmpCover/polEmpCoverUpdate',
        baseURL: 'CRUD',
    },
    saveMedicalDetails: {
        url: '/medexFeeDtl/save',
        baseURL: 'CRUD',
    },
    updateMedicalDetails: {
        url: '/medexFeeDtl/updateMedExFeeDtl',
        baseURL: 'CRUD',
    },

    saveBeneficiaryDetails: {
        url: '/polBeneficiary/save',
        baseURL: 'CRUD',
    },
    updateBeneficiaryDetails: {
        url: '/polBeneficiary/polBeneficiaryUpdate',
        baseURL: 'CRUD',
    },
    saveChargesDetails: {
        url: '/polCharge/save',
        baseURL: 'CRUD',
    },
    updateChargesDetails: {
        url: '/polCharge/polChargeUpdate',
        baseURL: 'CRUD',
    },
    saveDisLoadDetails: {
        url: '/polDiscLoad/save',
        baseURL: 'CRUD',
    },
    updateDisLoadDetails: {
        url: '/polDiscLoad/polDiscLoadUpdate',
        baseURL: 'CRUD',
    },
    saveConditionsDetails: {
        url: '/condition/save',
        baseURL: 'CRUD',
    },
    updateConditionsDetails: {
        url: '/condition/update',
        baseURL: 'CRUD',
    },
    updateProposalChecklistFlag: {
        url: 'docToDoList/statusFlagUpdate',
        baseURL: 'CRUD',
    },
    updateProposalChecklistFlagBulk: {
        url: 'docToDoList/statusFlagBulkUpdate',
        baseURL: 'CRUD',
    },
    updateProposalStepperStatus: {
        url: '/policy/updateStepperFlag',
        baseURL: 'CRUD',
    },
    updateProposalFreezeStatus: {
        url: '/policy/updateFreezeFlag',
        baseURL: 'CRUD',
    },
    DMSFileUpload: {
        url: '/dms/uploadMultiple',
        baseURL: 'DOCPRINT',
    },
    DMSView: {
        url: '/dms/view',
        baseURL: 'DOCPRINT',
    },
    DMSDelete: {
        url: '/dms/deleteFiles',
        baseURL: 'DOCPRINT',
    },
    getBrokerList: {
        url: '/polBroker/getPolBrokerByid',
        baseURL: 'CRUD',
    },
    policySubmit: {
        url: '/policy/onSubmit',
        baseURL: 'CRUD',
    },
    UWSubmit: {
        url: '/policy/uwSubmit',
        baseURL: 'CRUD',
    },
    sessionMaintain: {
        url: '/auth/expire-session',
    },
    updateBrokers: {
        url: '/polBroker/polBrokerUpdate',
        baseURL: 'CRUD',
    },
    receiptSave: {
        url: '/receiptHdr/save',
        baseURL: 'CRUD',
    },
    getReceiptHeader: {
        url: '/receiptHdr/get',
        baseURL: 'CRUD',
    },
    getDuesDetails: {
        url: '/receiptProcess/get',
        baseURL: 'CRUD',
    },
    saveDueSelected: {
        url: '/receiptProcess/update',
        baseURL: 'CRUD',
    },
    updateReceiptHdr: {
        url: '/receiptHdr/update',
        baseURL: 'CRUD',
    },
    receiptSearch: {
        url: '/receiptHdr/search',
        baseURL: 'CRUD',
    },
    quotationSearch: {
        url: '/policy/search',
        baseURL: 'CRUD',
    },
    claimListSearch: {
        url: '/ltclaim/search',
        baseURL: 'CRUD',
    },
    policySearch: {
        url: '/policy/polSearch',
        baseURL: 'CRUD',
    },
    getPayDetails: {
        url: '/receiptDetail/get',
        baseURL: 'CRUD',
    },
    savePayDetails: {
        url: '/receiptDetail/save',
        baseURL: 'CRUD',
    },
    updatePayDetails: {
        url: '/receiptDetail/update',
        baseURL: 'CRUD',
    },
    newparamlov: {
        url: '/common/newparamlov',
    },
    surrMatGet: {
        url: '/surrMattValues/get',
        baseURL: 'CRUD',
    },
    getLoanDetails: {
        url: '/loan/get',
        baseURL: 'CRUD',
    },
    getReportList: {
        url: '/RepotBuilder/generateGrid',
        baseURL: 'DOCPRINT',
    },
    getRulesJSON: {
        url: '/common/rulesJson',
    },
    getProRules: {
        url: '/common/boundaryConds',
    },

    saveLoanDetails: {
        url: '/loan/save',
        baseURL: 'CRUD',
    },

    updateLoanDetails: {
        url: '/loan/update',
        baseURL: 'CRUD',
    },

    deleteLoanDetails: {
        url: '/loan/delete',
        baseURL: 'CRUD',
    },
    deleteBroker: {
        url: '/polBroker/delete',
        baseURL: 'CRUD',
    },
    DMSFileGenerateDocument: {
        url: '/report/generatedocument',
        baseURL: 'DOCPRINT',
    },
    maturityProcessSaveFrontForm: {
        url: '/matProHeader/save',
        baseURL: 'CRUD',
    },
    maturityProcessUpdateFrontForm: {
        url: '/matProHeader/update',
        baseURL: 'CRUD',
    },
    maturityProcessGetFrontForm: {
        url: '/matProHeader/get',
        baseURL: 'CRUD',
    },
    productMasterCreate: {
        url: '/ProdMaster/save',
        baseURL: 'CRUD',
    },
    productMasterUpdate: {
        url: '/ProdMaster/update',
        baseURL: 'CRUD',
    },
    withdrawSetupCreate: {
        url: '/wdrasetup/save',
        baseURL: 'CRUD',
    },
    withdrawSetupUpdate: {
        url: '/wdrasetup/update',
        baseURL: 'CRUD',
    },
    saveProFacDetails: {
        url: '/prodFactor/save',
        baseURL: 'CRUD',
    },
    updateProFacDetails: {
        url: '/prodFactor/update',
        baseURL: 'CRUD',
    },
    DMSFileUpload64: {
        url: '/dms/new/uploadMultiple',
        baseURL: 'DOCPRINT',
    },
    DMSView64: {
        url: '/dms/retrieve',
        baseURL: 'DOCPRINT',
    },
    DMSDelete64: {
        url: '/dms/deleteFiles',
        baseURL: 'DOCPRINT',
    },
    LTQuoteSave: {
        url: '/ltQuoteDetails/save',
        baseURL: 'CRUD',
    },
    LTQuoteUpdate: {
        url: '/ltQuoteDetails/update',
        baseURL: 'CRUD',
    },
    LTQuoteDelete: {
        url: '/ltQuoteDetails/delete',
        baseURL: 'CRUD',
    },
    LTQuoteGet: {
        url: '/ltQuoteDetails/get',
        baseURL: 'CRUD',
    },
    LTQuoteUpdateCoverData: {
        url: '/ltQuoteDetails/updateLtQuotCoverData',
        baseURL: 'CRUD',
    },
    LTQuoteBasicFieldList: {
        url: '/common/editFields',
    },
    LTQuoteAssuredDtlsCreate: {
        url: '/ltQquotAssuredDtls/save',
    },
    LTQuoteAssuredDtlsUpdate: {
        url: '/ltQquotAssuredDtls/update',
        baseURL: 'CRUD',
    },
    LTQuoteAssuredDtlsDelete: {
        url: '/ltQquotAssuredDtls/delete',
    },
    LTQuoteAssuredDtlsGet: {
        url: '/common/ltQquotAssuredDtlsEdit',
    },
    LTQuoteBeneficiaryCreate: {
        url: '/ltQuoteBeneficiary/save',
        baseURL: 'CRUD',
    },
    LTQuoteBeneficiaryUpdate: {
        url: '/ltQuoteBeneficiary/update',
        baseURL: 'CRUD',
    },
    LTQuoteBeneficiaryDelete: {
        url: '/ltQuoteBeneficiary/delete',
    },
    LTQuoteBeneficiaryGet: {
        url: '/common/ltQuoteBeneficiaryEdit',
    },
    LTQuoteBasicInfoGet: {
        url: '/common/ltQuoteEdit',
    },
    LTQuoteQuestionaire: {
        url: '/ltQquotDiscLoad/getQuestionnaire',
        baseURL: 'CRUD',
    },
    LTQuoteQuestionaireSave: {
        url: '/ltQquotDiscLoad/saveQuestionnaire',
        baseURL: 'CRUD',
    },
    LTQuoteQuestionaireGet: {
        url: '/ltQquotDiscLoad/getQuestionnaireWithValues',
        baseURL: 'CRUD',
    },
    LTQuoteQuestionaireUpdate: {
        url: '/ltQquotDiscLoad/updateQuestionnaireWithValues',
        baseURL: 'CRUD',
    },
    LTQuoteChecklistSave: {
        url: '/docList/saveDocList',
        baseURL: 'CRUD',
    },
    LTQuoteChecklistUpdate: {
        url: '/docList/updateDocList',
        baseURL: 'CRUD',
    },
    emailTrigger: {
        url: '/emailTemplate/sendMail',
    }
};

export default POST_API_URL;
