import visacard from '../../assets/VisaStamp.png'
import masterCard from '../../assets/MCStamp.png'
import bankImg from '../../assets/bankStamp.png'


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
    'screenName', 'uploadscrn', 'doc_sys_id', 'filepath'
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

export const payMethodlist = [
    {
        id: 1,
        name: 'Pay by card',
        description: 'To pay, please enter your VISA, MasterCard or Maestro payment card information.',
        img: visacard
    },
    {
        id: 2,
        name: 'Pay via internet banking',
        description: 'Do you have access to internet banking and want to pay immediately? Just select your bank and make the payment.',
        img: bankImg
    },
    {
        id: 3,
        name: 'Pay via Cheque.',
        description: 'Do you have to Cheque and want to pay from Cheque? Just select your bank and make the payment.',
        img: bankImg
    }
]

export const quoteSteps = [
    { label: 'Basic Details' },
    { label: 'List of Benefits' },
    { label: 'Assured/Cust Details' },
    { label: 'Questions' },
    { label: 'Upload Docs' },
    { label: 'Review' },
    { label: 'Payment' },
];

export const grpSteps = [
    { label: 'Basic Details' },
    { label: 'Plan Summary' },
    { label: 'Review' },
    { label: 'Payment' },
];