import React, { useState } from 'react';
import { Tab, Tabs } from '../../../../components/customTabs/Tabs';
import PolicyDetails from './policyDetails/PolicyDetails';

const PolicyTabs = () => {
 const [activeTab, setActiveTab] = useState(0);

 const handleTabClick = index => {
  setActiveTab(index);
 };
 return (
  <div>
   <Tabs activeTab={activeTab} onTabClick={handleTabClick}>
    <Tab label='Policy Details'>
     <PolicyDetails />
    </Tab>
    <Tab label='Charges'>
     <div>Charges</div>
    </Tab>
    <Tab label='Ded & Bonus'>
     <div>Ded & Bonus</div>
    </Tab>
    <Tab label='Pay To'>
     <div>Pay To</div>
    </Tab>
    <Tab label='Checklist'>
     <div>Checklist</div>
    </Tab>
    <Tab label='RI'>
     <div>RI</div>
    </Tab>
    <Tab label='History'>
     <div>History</div>
    </Tab>
   </Tabs>
  </div>
 );
};

export default PolicyTabs;
