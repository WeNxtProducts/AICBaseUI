export const basicInfoInitValues = {
    basic_info: {
        formFields: {
            title: '',
            first_name: '',
            midle_name: '',
            last_name: '',
            dob: '',
            gender: '',
            mob_no: '',
            email_id: '',
            plan_term: '',
            currency: '',
            sum_assured: '',
            prem_freq: '',
            occupation_category: '',
            occupation: '',
            nationality: '',
            smoker: '',
            country_residence: '',
            promo_code: '',
        },
    },
};

export const quoteList = [
    {
        label: 'Quote 1',
        value: '1',
    },
    {
        label: 'Quote 2',
        value: '2',
    },
    {
        label: 'Quote 3',
        value: '3',
    },
    {
        label: 'Quote 4',
        value: '4',
    },
    {
        label: 'Quote 5',
        value: '5',
    },
];


export const quoteCols = [
    {
        id: 1,
        label: 'Plan terms in Years'
    },
    {
        id: 2,
        label: 'Total Premium'
    },
    {
        id: 3,
        label: 'Sum Assured in USD'
    },
    {
        id: 4,
        label: 'Premium Frequency'
    },
    {
        id: 5,
        label: 'Cover 1;'
    },
    {
        id: 6,
        label: 'Cover 2;'
    },
    {
        id: 7,
        label: 'Cover 3;'
    },
    {
        id: 8,
        label: 'Cover 4;'
    },
    {
        id: 9,
        label: 'Cover 5;'
    },
    {
        id: 10,
        label: 'Cover 6;'
    },
    {
        id: 11,
        label: 'Cover 7;'
    },
    {
        id: 12,
        label: 'Bonus'
    },
    {
        id: 13,
        label: 'Maturity Amount'
    }
]

export const quoteRows = [
    {
        id: 1,
        label: '9'
    },
    {
        id: 2,
        label: '10,000'
    },
    {
        id: 3,
        label: '10,000,000'
    },
    {
        id: 4,
        label: 'Half Yearly'
    },
    {
        id: 5,
        label: 'NA'
    },
    {
        id: 6,
        label: '20,000'
    },
    {
        id: 7,
        label: '1,000'
    },
    {
        id: 8,
        label: '3,333'
    },
    {
        id: 9,
        label: 'NA'
    },
    {
        id: 10,
        label: '2,000'
    },
    {
        id: 11,
        label: 'NA'
    },
    {
        id: 12,
        label: '1,00,000'
    },
    {
        id: 13,
        label: '10,00,000'
    }
]

export const Roptions = [
    {
        label: 'Assignee',
        value: 'A',
    },
    {
        label: 'Nominee',
        value: 'N',
    },
    {
        label: 'As per Shariah Law',
        value: 'S',
    },
];

export const initialQuestionnaire = {
    "status_msg": "Get Question",
    "Data": [
        {
            "id": 0,
            "label": "Age Proof"
        },
        {
            "id": 1,
            "label": "ID Proof"
        },
        {
            "questions": [
                {
                    "no": [
                        {
                            "id": 1,
                            "quest": "No. Of Cigarettes Per Day"
                        }
                    ],
                    "yes": [
                        {
                            "id": 2,
                            "quest": "Sum Assured of Previous Policy"
                        }
                    ]
                }
            ],
            "id": 4,
            "label": "Have you ever applied for a fully underwritten insurance policy for life cover only and been refused terms or declined for medical or heath related reasons?"
        },
        {
            "id": 2,
            "label": "Do You Smoke"
        },
        {
            "questions": [
                {
                    "yes": [
                        {
                            "id": 3,
                            "quest": "Frequency of Intake"
                        }
                    ]
                }
            ],
            "id": 3,
            "label": "Do You Drink Alcohol"
        }
    ],
    "status": "SUCCESS"
}

export const checklist = [
    {
        id: 1,
        description: 'Age Proof',
        fileName: '',
        status: true
    },
    {
        id: 2,
        description: 'License',
        fileName: '',
        status: false
    },
    {
        id: 3,
        description: 'PAN Card',
        fileName: '',
        status: false
    }
]

export const DeleteKeys = [
    'DocType', 'TranId', 'base64String', 'dms_status', 'filename',
    'genType', 'module', 'param_add1', 'param_add2', 'replaceFlag',
    'screenName', 'uploadscrn'
];

export const custDetails = [
    {
        id: 1,
        label: 'Name',
        value: 'aaaaaaaaa'
    },
    {
        id: 2,
        label: 'Mobile',
        value: '9822728398'
    },
    {
        id: 3,
        label: 'Email',
        value: 'hh@gmail.com'
    },
    {
        id: 4,
        label: 'Alternate Email',
        value: 'aa@gmail.com'
    },
    {
        id: 5,
        label: 'DOB',
        value: '10/09/1997'
    },
    {
        id: 6,
        label: 'Age',
        value: '18 Years'
    },
    {
        id: 7,
        label: 'Gender',
        value: 'Male'
    },
    {
        id: 8,
        label: 'Martial Status',
        value: 'Single'
    },
    {
        id: 9,
        label: 'Weight',
        value: '91 KG'
    },
    {
        id: 10,
        label: 'Height',
        value: '6’1 ft'
    },
    {
        id: 11,
        label: 'Smoker',
        value: 'No'
    },
    {
        id: 12,
        label: 'Country',
        value: 'AAAAAAAAAAAA'
    },
    {
        id: 13,
        label: 'Nationality',
        value: 'aaaaaaaaaaaa'
    },
    {
        id: 14,
        label: 'Place of Birth',
        value: 'AAAAAAA'
    },
    {
        id: 15,
        label: 'Emirates ID',
        value: '19128373739'
    },
    {
        id: 16,
        label: 'Emmirates Expirt date',
        value: '10/10/2026 10:00:00 AM'
    }
]

export const commDetails = [
    {
        id: 1,
        label: 'Current Address',
        value: `12,TEST,TEST,TEST,ASOSIEJMDD EIEIERUFJFD,DUBAI-102939384`
    },
    {
        id: 2,
        label: 'Permanent Address',
        value: `12,TEST,TEST,TEST,ASOSIEJMDD EIEIERUFJFD,DUBAI-102939384`
    }
]

export const tableData = [
    { benefit: 'Death any charge', sumAssured: '1000000', term: 10, premium: '500.99', include: true },
    { benefit: 'Permanent Total Disability(Accident & Sickness)', sumAssured: '200000', term: 15, premium: '1,000', include: false },
    { benefit: 'Permanent Total Disability(Accident & Sickness)(Additional)', sumAssured: '100.78', term: 10, premium: '500', include: false },
    { benefit: 'Critical Illness(Accelerated)', sumAssured: '200000', term: 7, premium: '2000.98', include: true },
    { benefit: 'Critical Illness(Additional)', sumAssured: '100000', term: 8, premium: '500', include: true },
    { benefit: 'Terminal Illness(Accelerated)', sumAssured: '200000', term: 9, premium: '1,000', include: false },
    { benefit: 'Passive War Risk', sumAssured: '100000', term: 12, premium: '5000.20', include: false },
];


export const digitalSignature = `data:image/png;base64,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`
