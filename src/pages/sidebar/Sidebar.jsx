import { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import weNxtLogo from '../../assets/WeNxt_Logo-removebg.png';
import { useDispatch, useSelector } from 'react-redux';
import useApiRequests from '../../services/useApiRequests';
import { setSidebarList } from '../../globalStore/slices/TokenAndMenuList';
import './Sidebar.scss';
import Loader from '../../components/loader/Loader';

const menuList = [
  {
    "menuActionType": "M",
    "menuOptionDesc": "Reports",
    "menuIconPath": "bi bi-file-earmark-break",
    "menuDispSeqNo": "3",
    "childrens": [
      {
        "menuActionType": "U",
        "menuOptionDesc": "Premium Arrears Letter Revised",
        "menuDispSeqNo": "2",
        "menuURL": "/claimsettlement",
        "menuAction": "...",
        "menuId": "M030002",
        "menuParentId": "M03",
        "menuScreenName": "Claim Settlement"
      },
      {
        "menuActionType": "M",
        "menuOptionDesc": "Letter Fomat",
        "menuIconPath": "bi bi-house-gear",
        "menuDispSeqNo": "10",
        "menuId": "M10",
        "menuParentId": "*",
        "menuScreenName": "Report Builder",
        "childrens": [
          {
            "menuActionType": "U",
            "menuOptionDesc": "Lapse Letter",
            "menuDispSeqNo": "1",
            "menuURL": "/claimsEntryList",
            "menuAction": "...",
            "menuId": "M030001",
            "menuParentId": "M03",
            "listingQueryId": "50",
            "menuScreenName": "Claim Entry"
          },
          {
            "menuActionType": "U",
            "menuOptionDesc": "Medical Examination Report",
            "menuDispSeqNo": "1",
            "menuURL": "/claimsEntryList",
            "menuAction": "...",
            "menuId": "M030001",
            "menuParentId": "M03",
            "listingQueryId": "50",
            "menuScreenName": "Claim Entry"
          },
          {
            "menuActionType": "U",
            "menuOptionDesc": "Doctor Fee Letter",
            "menuDispSeqNo": "1",
            "menuURL": "/claimsEntryList",
            "menuAction": "...",
            "menuId": "M030001",
            "menuParentId": "M03",
            "listingQueryId": "50",
            "menuScreenName": "Claim Entry"
          }
        ]
      },
      {
        "menuActionType": "M",
        "menuOptionDesc": "Payouts Report",
        "menuIconPath": "bi bi-house-gear",
        "menuDispSeqNo": "10",
        "menuId": "M10",
        "menuParentId": "*",
        "menuScreenName": "Report Builder",
        "childrens": [
          {
            "menuActionType": "U",
            "menuOptionDesc": "Surrender Register",
            "menuDispSeqNo": "1",
            "menuURL": "/claimsEntryList",
            "menuAction": "...",
            "menuId": "M030001",
            "menuParentId": "M03",
            "listingQueryId": "50",
            "menuScreenName": "Claim Entry"
          },
          {
            "menuActionType": "U",
            "menuOptionDesc": "Cash Back Register",
            "menuDispSeqNo": "1",
            "menuURL": "/claimsEntryList",
            "menuAction": "...",
            "menuId": "M030001",
            "menuParentId": "M03",
            "listingQueryId": "50",
            "menuScreenName": "Claim Entry"
          },
          {
            "menuActionType": "M",
            "menuOptionDesc": "Batch Report",
            "menuIconPath": "bi bi-house-gear",
            "menuDispSeqNo": "10",
            "menuId": "M10",
            "menuParentId": "*",
            "menuScreenName": "Report Builder",
            "childrens": [
              {
                "menuActionType": "U",
                "menuOptionDesc": "Unit Linked",
                "menuDispSeqNo": "1",
                "menuURL": "/claimsEntryList",
                "menuAction": "...",
                "menuId": "M030001",
                "menuParentId": "M03",
                "listingQueryId": "50",
                "menuScreenName": "Claim Entry"
              }, {
                "menuActionType": "U",
                "menuOptionDesc": "New Bussiness Underwriting",
                "menuDispSeqNo": "1",
                "menuURL": "/claimsEntryList",
                "menuAction": "...",
                "menuId": "M030001",
                "menuParentId": "M03",
                "listingQueryId": "50",
                "menuScreenName": "Claim Entry"
              },
            ]
          }
        ]
      }
    ],
    "menuId": "M03",
    "menuParentId": "*",
    "menuScreenName": "Claims"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Masters",
    "menuIconPath": "bi bi-gear-wide-connected",
    "menuDispSeqNo": "1",
    "childrens": [
      {
        "menuActionType": "U",
        "menuOptionDesc": "User Master",
        "menuDispSeqNo": "2",
        "menuURL": "/userMasterLiist",
        "menuId": "M010002",
        "menuParentId": "M01",
        "listingQueryId": "4",
        "menuScreenName": "User Master"
      }
    ],
    "menuId": "M01",
    "menuParentId": "*",
    "menuScreenName": "Masters"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Policy administration",
    "menuIconPath": "bi bi-newspaper",
    "menuDispSeqNo": "2",
    "menuId": "M02",
    "menuParentId": "*",
    "menuScreenName": "Policy Administration"
  },
  {
    "menuActionType": "F",
    "menuOptionDesc": "Policy",
    "menuIconPath": "bi bi-newspaper",
    "menuDispSeqNo": "2",
    "menuId": "M02",
    "menuParentId": "*",
    "menuScreenName": "Policy Administration"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Claims",
    "menuIconPath": "bi bi-building-exclamation",
    "menuDispSeqNo": "3",
    "childrens": [
      {
        "menuActionType": "U",
        "menuOptionDesc": "Claim Entry",
        "menuDispSeqNo": "1",
        "menuURL": "/claimsEntryList",
        "menuAction": "...",
        "menuId": "M030001",
        "menuParentId": "M03",
        "listingQueryId": "50",
        "menuScreenName": "Claim Entry"
      },
      {
        "menuActionType": "U",
        "menuOptionDesc": "Claim Settlement",
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
    "menuActionType": "M",
    "menuOptionDesc": "Queries",
    "menuIconPath": "bi bi-question-lg",
    "menuDispSeqNo": "4",
    "menuId": "M04",
    "menuParentId": "*",
    "menuScreenName": "Queries"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Re insurance",
    "menuIconPath": "bi bi-passport",
    "menuDispSeqNo": "5",
    "menuId": "M05",
    "menuParentId": "*",
    "menuScreenName": "Re Insurance"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Processing",
    "menuIconPath": "bi bi-cpu",
    "menuDispSeqNo": "6",
    "childrens": [
      {
        "menuActionType": "U",
        "menuOptionDesc": "E-Mail Setup",
        "menuDispSeqNo": "1",
        "menuURL": "/getTemplateList",
        "menuId": "M060001",
        "menuParentId": "M06",
        "listingQueryId": "64",
        "menuScreenName": "E-mail Setup"
      },
      {
        "menuActionType": "U",
        "menuOptionDesc": "Api To Json",
        "menuDispSeqNo": "2",
        "menuURL": "/apitojson",
        "menuId": "M060002",
        "menuParentId": "M06",
        "listingQueryId": "17",
        "menuScreenName": "API To JSON"
      },
      {
        "menuActionType": "U",
        "menuOptionDesc": "Docprint Setup",
        "menuDispSeqNo": "3",
        "menuURL": "/docPrintList",
        "menuId": "M060003",
        "menuParentId": "M06",
        "listingQueryId": "65",
        "menuScreenName": "DocPrint Setup"
      },
      {
        "menuActionType": "U",
        "menuOptionDesc": "Auto Dispatch Setup",
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
    "menuActionType": "M",
    "menuOptionDesc": "Reports",
    "menuIconPath": "bi bi-book",
    "menuDispSeqNo": "7",
    "menuId": "M07",
    "menuParentId": "*",
    "menuScreenName": "Reports"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Finance",
    "menuIconPath": "bi bi-piggy-bank",
    "menuDispSeqNo": "8",
    "menuId": "M08",
    "menuParentId": "*",
    "menuScreenName": "Finance"
  },
  {
    "menuActionType": "M",
    "menuOptionDesc": "Transaction",
    "menuIconPath": "bi bi-wallet2",
    "menuDispSeqNo": "9",
    "childrens": [
      {
        "menuActionType": "U",
        "menuOptionDesc": "Proposal",
        "menuDispSeqNo": "1",
        "menuURL": "/quotationList",
        "ds_type": 1,
        "POL_CLASS_CODE": "1",
        "ds_code": "PRO",
        "menuId": "M090002",
        "menuParentId": "M09",
        "listingQueryId": "21",
        "menuScreenName": "Proposal"
      },
      {
        "menuActionType": "U",
        "menuOptionDesc": "Policy",
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
        "menuActionType": "U",
        "menuOptionDesc": "Receipt",
        "menuDispSeqNo": "3",
        "menuURL": "/receiptList",
        "menuId": "M090003",
        "menuParentId": "M09",
        "listingQueryId": "211",
        "menuScreenName": "Receipt"
      },
      {
        "menuActionType": "U",
        "menuOptionDesc": "Endorsement",
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
    "menuActionType": "M",
    "menuOptionDesc": "Report builder",
    "menuIconPath": "bi bi-house-gear",
    "menuDispSeqNo": "10",
    "menuId": "M10",
    "menuParentId": "*",
    "menuScreenName": "Report Builder"
  },
]

export default function Sidebar() {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  // const menuList = useSelector(state => state?.tokenAndMenuList?.sidebarList);
  const groupId = useSelector(state => state?.tokenAndMenuList?.groupId);
  const menuListAPI = useApiRequests('getMenuList', 'GET');
  const [loader, setLoader] = useState(false);

  const handleMenuList = async () => {
    setLoader(true);
    try {
      const response = await menuListAPI('', { groupId });
      dispatch(setSidebarList(response?.Data));
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (menuList?.length === 0) handleMenuList();
  }, []);

  if (menuList?.length === 0) return <Loader />;

  return (
    <div
      className={`sidebar ${isExpanded ? 'sideBar_hovered' : ''}`}
      style={{
        width: isExpanded ? '15%' : '3.8%',
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
      <div className='sidebar-Header flex justify-between sticky top-0 mb-2'>
        <div>
          <img className='logo-resize p-1' alt='logo' src={weNxtLogo} />
        </div>
        {isExpanded && (
          <div className='flex items-center pr-4'>
            <i
              className='bi bi-tools tools-icon cursor-pointer'
            //  onClick={() => setIsExpanded(false)}
            />
          </div>
        )}
      </div>
      <div
      // onMouseEnter={() => setIsExpanded(true)}
      >
        {menuList?.length > 0 &&
          menuList?.map((item, index) => (
            <SidebarItem key={index} item={item} isExpanded={isExpanded} />
          ))}
      </div>
    </div>
  );
}
