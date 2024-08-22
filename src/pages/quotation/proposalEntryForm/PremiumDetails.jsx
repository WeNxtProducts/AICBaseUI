import React, { useContext, useState } from 'react';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import { StepperContext } from '../Quotation';

const PremiumDetails = () => {
 const { premDetails } = useContext(StepperContext);

 const renderPremiums = (label, fc = 0, lc = 0) => (
  <div className='w-full flex mt-2'>
   <div className='w-5/12'>
    <p className='label-style'>{label}</p>
   </div>
   <div className='w-1/5 pl-5'>
    <p className='value-style pre_style'>{formatNumber(fc)}</p>
   </div>
   <div className='w-1/5 pl-5'>
    <p className='value-style pre_style'>{formatNumber(lc)}</p>
   </div>
  </div>
 );

 return (
  <div className='premium_popover_content'>
   <div className='premium_title flex items-center'>
    <p className='premium_calc'>Premium Details</p>
   </div>
   {premDetails !== null && (
    <div className='details'>
     <div className='w-full flex'>
      <div className='w-5/12'></div>
      <div className='w-1/5'>
       <p className='fc_lc-style pl-5'>FC</p>
      </div>
      <div className='w-1/5'>
       <p className='fc_lc-style ml-5'>LC</p>
      </div>
     </div>
     {renderPremiums(
      'Basic Premium',
      premDetails?.POL_FC_BASIC_PREM,
      premDetails?.POL_LC_BASIC_PREM,
     )}
     {renderPremiums(
      'Total Rider Premium',
      premDetails?.POL_FC_ADDL_PREM,
      premDetails?.POL_LC_ADDL_PREM,
     )}
     {renderPremiums(
      'Total Loading',
      premDetails?.POL_FC_EXTRA_PREM,
      premDetails?.POL_LC_EXTRA_PREM,
     )}
     {renderPremiums('Total Discount', premDetails?.POL_FC_DISC, premDetails?.POL_LC_DISC)}
     {renderPremiums('Charges', premDetails?.POL_FC_CHARGE, premDetails?.POL_LC_CHARGE)}
    </div>
   )}
  </div>
 );
};

export default PremiumDetails;
