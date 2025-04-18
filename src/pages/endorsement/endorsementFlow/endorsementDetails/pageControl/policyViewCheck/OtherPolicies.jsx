import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { EndorsementContext } from '../../../../Endorsement';
import showNotification from '../../../../../../components/notification/Notification';
import useApiRequests from '../../../../../../services/useApiRequests';

const OtherPolicies = ({ proposalList, setProposalList, policyNumber, setPolicyNumber, dataLoaded,
  setTranIdPolicy
}) => {
  const { POL_NO, tranId, CUST_CODE } = useContext(EndorsementContext);
  const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (dataLoaded)
      handleGetProposalList()
  }, [dataLoaded])


  const handleGetProposalList = async () => {
    try {
      const response = await getMapQuery({ queryParams: { CUST_CODE } }, { queryId: 222 });
      if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
      if (response?.status === 'SUCCESS') {
        const index = response?.Data?.findIndex(item => item?.Policy_Number === POL_NO);
        const findPol = index !== -1 ? response?.Data[index] : null;
        if (findPol) {
          setProposalList(response?.Data);
          setPolicyNumber(findPol?.Policy_Number);
          setCurrentIndex(index)
          setTranIdPolicy(findPol?.ID)
        }
      }
    } catch (err) {
      console.log('err : ', err);
    }
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleSetSelected = () => {
    setPolicyNumber(proposalList[currentIndex]?.Policy_Number);
    setTranIdPolicy(proposalList[currentIndex]?.ID)
  };

  return (
    <div className='other_policies p-3'>
      {proposalList !== null &&
        <>
          <div className='flex items-center justify-between'>
            <p className='box_head'>
              Other Policies / Proposals <span className='counter'>{proposalList?.length}</span>
            </p>
            <div>
              <Button
                className={
                  policyNumber !== proposalList[currentIndex]?.Policy_Number
                    ? `view_policy`
                    : `view_policy_dis`
                }
                onClick={() => handleSetSelected()}>
                {policyNumber !== proposalList[currentIndex]?.Policy_Number ? 'View' : 'Viewing'}
              </Button>
            </div>
          </div>
          <div className='details mt-4 grid grid-cols-12 gap-1'>
            <div className='col-span-1 flex items-center'>
              <i
                className={`bi bi-chevron-left icon_arrow ${currentIndex === 0 ? 'arrow_disabled' : ''}`}
                onClick={() => handlePrev()}
              />
            </div>

            <div className='col-span-10'>
              <>
                <div className='w-full flex mt-2'>
                  <div className='w-3/5 flex items-center'>
                    <p className='label-style ml-4'>S.No</p>
                  </div>
                  <div className='w-2/5 flex items-center'>
                    <p className='value-style'>{proposalList[currentIndex]?.SNo || ''}</p>
                  </div>
                </div>
              </>

              <>
                <div className='w-full flex mt-2'>
                  <div className='w-3/5 flex items-center'>
                    <p className='label-style ml-4'>Policy Number</p>
                  </div>
                  <div className='w-2/5 flex items-center'>
                    <p className='value-style'>{proposalList[currentIndex]?.Policy_Number || ''}</p>
                  </div>
                </div>
              </>

              <>
                <div className='w-full flex mt-2'>
                  <div className='w-3/5 flex items-center'>
                    <p className='label-style ml-4'>Policy Start Date</p>
                  </div>
                  <div className='w-2/5 flex items-center'>
                    <p className='value-style'>
                      {dayjs(proposalList[currentIndex]?.Start_Date).format('YYYY-MM-DD') || ''}
                    </p>
                  </div>
                </div>
              </>

              <>
                <div className='w-full flex mt-2'>
                  <div className='w-3/5 flex items-center'>
                    <p className='label-style ml-4'>Policy Status</p>
                  </div>
                  <div className='w-2/5 flex items-center'>
                    <p className='value-style'>{proposalList[currentIndex]?.Status || ''}</p>
                  </div>
                </div>
              </>
            </div>

            <div className='col-span-1 flex items-center'>
              <i
                className={`bi bi-chevron-right icon_arrow ${currentIndex === proposalList?.length - 1 ? 'arrow_disabled' : ''
                  }`}
                onClick={() => handleNext()}
              />
            </div>
          </div>
        </>}
    </div>
  );
};

export default OtherPolicies;
