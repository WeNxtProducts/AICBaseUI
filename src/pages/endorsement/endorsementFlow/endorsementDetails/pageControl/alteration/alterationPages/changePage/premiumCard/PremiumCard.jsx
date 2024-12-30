import React from 'react';
import { formatNumber } from '../../../../../../../../../components/commonHelper/CurrentFormatter';

const PremiumCard = () => {
 const premDetails = {};
 const renderPremiums = (label, fc = 0, lc = 0) => (
  <div className='w-full flex mt-2'>
   <div className='w-2/5'>
    <p className='label-style'>{label}</p>
   </div>
   <div className='w-1/4 flex justify-end'>
    <p className='value-style pre_style'>{formatNumber(fc)}</p>
   </div>
   <div className='w-1/4 flex justify-end'>
    <p className='value-style pre_style'>{formatNumber(lc)}</p>
   </div>
  </div>
 );

 return (
  <div className='col-span-1'>
   <div className='premium_cards flex flex-col items-center'>
    <p>Premium Summary</p>
    <p>Premium Calcuation Summary</p>
    <div className='premium_summary'>
     <div className='details'>
      <div className='w-full flex'>
       <div className='w-2/5'></div>
       <div className='w-1/4 flex justify-end'>
        <p className='fc_lc-style'>FC</p>
       </div>
       <div className='w-1/4 flex justify-end'>
        <p className='fc_lc-style'>LC</p>
       </div>
      </div>
      {renderPremiums(
       'Basic Premium',
       premDetails?.POL_FC_BASIC_PREM || 500,
       premDetails?.POL_LC_BASIC_PREM || 200,
      )}
      {renderPremiums(
       'Total Rider Premium',
       premDetails?.POL_FC_ADDL_PREM || 100000,
       premDetails?.POL_LC_ADDL_PREM || 56890.8,
      )}
      {renderPremiums(
       'Total Loading',
       premDetails?.POL_FC_EXTRA_PREM || 1222,
       premDetails?.POL_LC_EXTRA_PREM || 3,
      )}
      {renderPremiums(
       'Total Discount',
       premDetails?.POL_FC_DISC || 1200.78,
       premDetails?.POL_LC_DISC || 2300.9,
      )}
      {renderPremiums(
       'Charges',
       premDetails?.POL_FC_CHARGE || 78909.9,
       premDetails?.POL_LC_CHARGE || 256789,
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default PremiumCard;
