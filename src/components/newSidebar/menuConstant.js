export const menuData = [
    {
        "menuOptionDesc": "Masters",
        "menuActionType": "M",
        "menuIconPath": "bi bi-gear-wide-connected",
        "menuDispSeqNo": "1",
        "childrens": [
            {
                "menuOptionDesc": "User Master",
                "menuActionType": "U",
                "menuDispSeqNo": "2",
                "menuURL": "/userMasterLiist",
                "menuId": "M010002",
                "menuParentId": "M01",
                "listingQueryId": "4",
                "menuScreenName": "User Master",
                "childrens": [
                    {
                        "menuOptionDesc": "Custo",
                        "menuActionType": "U",
                        "menuDispSeqNo": "2",
                        "menuURL": "/userMasterLiist",
                        "menuId": "M010002222",
                        "menuParentId": "M010002",
                        "listingQueryId": "4",
                        "menuScreenName": "Custo"
                    }
                ]
            }
        ],
        "menuId": "M01",
        "menuParentId": "*",
        "menuScreenName": "Masters"
    },
    {
        "menuOptionDesc": "Policy administration",
        "menuActionType": "M",
        "menuIconPath": "bi bi-newspaper",
        "menuDispSeqNo": "2",
        "menuId": "M02",
        "menuParentId": "*",
        "menuScreenName": "Policy Administration"
    },
    {
        "menuOptionDesc": "Claims",
        "menuActionType": "M",
        "menuIconPath": "bi bi-building-exclamation",
        "menuDispSeqNo": "3",
        "childrens": [
            {
                "menuOptionDesc": "Claim Entry",
                "menuActionType": "U",
                "menuDispSeqNo": "1",
                "menuURL": "/claimsEntryList",
                "menuAction": "...",
                "menuId": "M030001",
                "menuParentId": "M03",
                "listingQueryId": "50",
                "menuScreenName": "Claim Entry"
            },
            {
                "menuOptionDesc": "Claim Settlement",
                "menuActionType": "U",
                "menuDispSeqNo": "2",
                "menuURL": "/claimsettlement",
                "menuAction": "...",
                "menuId": "M030002",
                "menuParentId": "M03",
                "menuScreenName": "Claim Settlement"
            }
        ],
        "menuId": "M03",
        "menuParentId": "*",
        "menuScreenName": "Claims"
    },
    {
        "menuOptionDesc": "Queries",
        "menuActionType": "M",
        "menuIconPath": "bi bi-question-lg",
        "menuDispSeqNo": "4",
        "menuId": "M04",
        "menuParentId": "*",
        "menuScreenName": "Queries"
    },
    {
        "menuOptionDesc": "Re insurance",
        "menuActionType": "M",
        "menuIconPath": "bi bi-passport",
        "menuDispSeqNo": "5",
        "childrens": [
            {
                "menuOptionDesc": "Re Insurance",
                "menuActionType": "U",
                "menuDispSeqNo": "1",
                "menuURL": "/reInsuranceList",
                "menuId": "M050001",
                "menuParentId": "M05",
                "listingQueryId": "239",
                "menuScreenName": "Re Insurance"
            },
            {
                "menuOptionDesc": "Gl Re Insurance",
                "menuActionType": "U",
                "menuDispSeqNo": "2",
                "menuURL": "/glReInsuranceList",
                "menuId": "M050002",
                "menuParentId": "M05",
                "listingQueryId": "239",
                "menuScreenName": "GL Re Insurance"
            }
        ],
        "menuId": "M05",
        "menuParentId": "*",
        "menuScreenName": "Re Insurance"
    },
    {
        "menuOptionDesc": "Processing",
        "menuActionType": "M",
        "menuIconPath": "bi bi-cpu",
        "menuDispSeqNo": "6",
        "childrens": [
            {
                "menuOptionDesc": "E-Mail Setup",
                "menuActionType": "U",
                "menuDispSeqNo": "1",
                "menuURL": "/getTemplateList",
                "menuId": "M060001",
                "menuParentId": "M06",
                "listingQueryId": "64",
                "menuScreenName": "E-mail Setup"
            },
            {
                "menuOptionDesc": "Api To Json",
                "menuActionType": "U",
                "menuDispSeqNo": "2",
                "menuURL": "/apitojson",
                "menuId": "M060002",
                "menuParentId": "M06",
                "listingQueryId": "17",
                "menuScreenName": "API To JSON"
            },
            {
                "menuOptionDesc": "Docprint Setup",
                "menuActionType": "U",
                "menuDispSeqNo": "3",
                "menuURL": "/docPrintList",
                "menuId": "M060003",
                "menuParentId": "M06",
                "listingQueryId": "65",
                "menuScreenName": "DocPrint Setup"
            },
            {
                "menuOptionDesc": "Auto Dispatch Setup",
                "menuActionType": "U",
                "menuDispSeqNo": "4",
                "menuURL": "/autoDispatch",
                "menuId": "M060004",
                "menuParentId": "M06",
                "listingQueryId": "80",
                "menuScreenName": "AUTO DISPATCH SETUP"
            }
        ],
        "menuId": "M06",
        "menuParentId": "*",
        "menuScreenName": "Processing"
    },
    {
        "menuOptionDesc": "Reports",
        "menuActionType": "M",
        "menuIconPath": "bi bi-book",
        "menuDispSeqNo": "7",
        "menuId": "M07",
        "menuParentId": "*",
        "menuScreenName": "Reports"
    },
    {
        "menuOptionDesc": "Finance",
        "menuActionType": "M",
        "menuIconPath": "bi bi-piggy-bank",
        "menuDispSeqNo": "8",
        "menuId": "M08",
        "menuParentId": "*",
        "menuScreenName": "Finance"
    },
    {
        "menuOptionDesc": "Transaction",
        "menuActionType": "M",
        "menuIconPath": "bi bi-wallet2",
        "menuDispSeqNo": "9",
        "childrens": [
            {
                "menuOptionDesc": "Proposal",
                "menuActionType": "U",
                "menuDispSeqNo": "1",
                "menuURL": "/quotationList",
                "POL_CLASS_CODE": "1",
                "ds_type": 1,
                "ds_code": "PRO",
                "menuId": "M090002",
                "menuParentId": "M09",
                "listingQueryId": "21",
                "menuScreenName": "Proposal"
            },
            {
                "menuOptionDesc": "Policy",
                "menuActionType": "U",
                "menuDispSeqNo": "2",
                "menuURL": "/policyList",
                "ds_type": 2,
                "ds_code": "POL",
                "menuId": "M090001",
                "menuParentId": "M09",
                "listingQueryId": "203",
                "menuScreenName": "Policy"
            },
            {
                "menuOptionDesc": "Receipt",
                "menuActionType": "U",
                "menuDispSeqNo": "3",
                "menuURL": "/receiptList",
                "menuId": "M090003",
                "menuParentId": "M09",
                "listingQueryId": "211",
                "menuScreenName": "Receipt"
            },
            {
                "menuOptionDesc": "Endorsement",
                "menuActionType": "U",
                "menuDispSeqNo": "4",
                "menuURL": "/endorsementList",
                "menuId": "M090004",
                "menuParentId": "M09",
                "listingQueryId": "219",
                "menuScreenName": "Endorsement"
            }
        ],
        "menuId": "M09",
        "menuParentId": "*",
        "menuScreenName": "Transaction"
    },
    {
        "menuOptionDesc": "Report builder",
        "menuActionType": "M",
        "menuIconPath": "bi bi-house-gear",
        "menuDispSeqNo": "10",
        "childrens": [
            {
                "menuOptionDesc": "BASE REPORT",
                "menuActionType": "M",
                "menuURL": "/rep1",
                "childrens": [
                    {
                        "menuOptionDesc": "BUSINESS REPORT",
                        "menuActionType": "R",
                        "menuURL": "/rep1",
                        "menuId": "REP01-1",
                        "menuParentId": "REP01",
                        "listingQueryId": "REP01-1"
                    }
                ],
                "menuId": "REP01",
                "menuParentId": "**",
                "listingQueryId": "REP01"
            }
        ],
        "menuAction": "**",
        "menuId": "M10",
        "menuParentId": "*",
        "menuScreenName": "Report Builder"
    }
]