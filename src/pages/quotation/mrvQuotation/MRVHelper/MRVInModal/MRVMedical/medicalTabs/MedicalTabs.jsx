import React, { useContext, useEffect, useState } from 'react';
import MedicalHeader from '../MedicalHeader';
import MRVListingQuotation from '../../../MRVListing';
import { Tabs } from 'antd';
import {
 bankColumn,
 bankData,
} from '../../../../../../../components/tableComponents/sampleData';
import TabPanelHeader from '../../../../../../../components/collapsePanelHeader/TabPanelHeader';
import MedicalForm from './MedicalForm';
import useMRVListing from '../../../../../../../components/mrvListing/useMRVListing';
import { StepperContext } from '../../../../../Quotation';
import ConfirmationModal from '../../../../../../../components/confirmationModal/ConfirmationModal';

const { TabPane } = Tabs;

const MedicalTabs = ({ tranId }) => {
 const { QuotationJSON } = useContext(StepperContext);
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [activeTabKey, setActiveTabKey] = useState('0');
 const [selectedDoctorFee, setSelectedDoctorFee] = useState('');
 const [editMRVId, setEditMRVId] = useState('');
 const [deleteConfirmation, setDeleteConfirmation] = useState(false);

 const handleTabChange = index => {
  setActiveTabKey(index);
 };

 const MRVListing = (queryId, Id) => {
  if (Id) {
   handleMRVListing(queryId, Id);
  }
 };

 useEffect(() => {
  MRVListing(10, tranId);
 }, []);

 const handleDeleteConfirm = id => {
  console.log('handleDeleteConfirm');
 };

 const handleClose = status => {
  const deleteId = editMRVId;
  // setEditMRVId('');
  if (status) handleDeleteConfirm(deleteId);
  else if (!status) setDeleteConfirmation(false);
 };

 return (
  <div>
   <MedicalHeader />
   <div className='mt-3 grid grid-cols-9'>
    <div className='col-span-7'>
     <Tabs
      size='small'
      centered={true}
      activeKey={activeTabKey}
      onChange={handleTabChange}>
      <TabPane key='0' tab={<TabPanelHeader name='Examination Details' />}>
       <MedicalForm root='life_assured_details' tranId={tranId} />
      </TabPane>
      <TabPane key='1' tab={<TabPanelHeader name='Doctor fee Details' />}>
       <MedicalForm root='Charges' tranId={selectedDoctorFee} />
      </TabPane>
     </Tabs>
    </div>
    <div className='col-span-2 p-3 border_left_divider'>
     <MRVListingQuotation
      root='medical'
      tableColumn={bankColumn}
      tableData={bankData}
     />
    </div>
   </div>
   {deleteConfirmation && (
    <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />
   )}
  </div>
 );
};

export default MedicalTabs;
