import React, { useState } from 'react';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';

const PremiumView = () => {
 const [premDetails, setPremDetails] = useState(null);

 const renderPremiums = (label, fc = 0, lc = 0) => (
  <div className='w-full flex mt-2'>
   <div className='w-5/12'>
    <p className='label-style'>{label}</p>
   </div>
   <div className='w-1/5'>
    <p className='value-style pre_style'>{formatNumber(fc)}</p>
   </div>
   <div className='w-1/5'>
    <p className='value-style pre_style'>{formatNumber(lc)}</p>
   </div>
  </div>
 );

 return (
  <div className='premiumDetails p-3'>
   <p>Premium Details</p>
   <div className='details'>
    <div className='w-full flex'>
     <div className='w-5/12'></div>
     <div className='w-1/5'>
      <p className='fc_lc-style'>FC</p>
     </div>
     <div className='w-1/5'>
      <p className='fc_lc-style'>LC</p>
     </div>
    </div>
    {renderPremiums(
     'Basic Premium',
     premDetails?.POL_FC_BASIC_PREM || 0,
     premDetails?.POL_LC_BASIC_PREM || 0,
    )}
    {renderPremiums(
     'Total Rider Premium',
     premDetails?.POL_FC_ADDL_PREM || 0,
     premDetails?.POL_LC_ADDL_PREM || 0,
    )}
    {renderPremiums(
     'Total Loading',
     premDetails?.POL_FC_EXTRA_PREM || 0,
     premDetails?.POL_LC_EXTRA_PREM || 0,
    )}
    {renderPremiums('Total Discount', premDetails?.POL_FC_DISC || 0, premDetails?.POL_LC_DISC || 0)}
    {renderPremiums('Charges', premDetails?.POL_FC_CHARGE || 0, premDetails?.POL_LC_CHARGE || 0)}
   </div>
  </div>
 );
};

export default PremiumView;
