import React from 'react';
import './CashbackProcessing.scss';
import FromHeader from '../../components/fieldsWithValues/FromHeader';
import ProcessForm from './ProcessForm';
import ProcessedLogs from './ProcessedLogs';

const CashbackProcessing = () => {
 return (
  <div className='cash-back-processing'>
   <FromHeader name='Maturity/Cashback Processing' />
   <ProcessForm />
   <ProcessedLogs />
  </div>
 );
};

export default CashbackProcessing;
