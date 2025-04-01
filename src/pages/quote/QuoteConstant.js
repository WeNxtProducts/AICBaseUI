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
