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

export const initialQuestionnaire = [
    {
        id: 1,
        label: 'Do you Smoke ?',
        questions: [
            {
                qId: 1,
                quest: 'Q1: How Many cigerettes do you smoke ?',
                field: 'Number'
            },
            {
                qId: 2,
                quest: 'Q1: How Many cigerettes do you smoke ?',
                field: 'Number'
            }
        ]
    },
    {
        id: 2,
        label: 'Do you Drink ?',
        questions: [
            {
                qId: 1,
                quest: 'Q1: How Many cigerettes do you smoke ?',
                field: 'Number'
            },
            {
                qId: 2,
                quest: 'Q1: How Many cigerettes do you smoke ?',
                field: 'Number'
            }
        ]

    },
    {
        id: 3,
        label: 'Medical History ?',
        questions: []

    },
    {
        id: 4,
        label: 'Do you Drink ?',
        questions: [
            {
                qId: 1,
                quest: 'Q1: How Many cigerettes do you smoke ?',
                field: 'Number'
            },
            {
                qId: 2,
                quest: 'Q1: How Many cigerettes do you smoke ?',
                field: 'Number'
            }
        ]

    },
]

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