const ClaimCurrency = () => {
 const renderRowHeader = head => (
  <div className='flex items-center'>
   <div className='w-1/4'></div>
   <div className='w-3/4 pl-3 flex items-center justify-center'>
    <p className='label-font'>{head}</p>
   </div>
  </div>
 );

 const renderRow = (title, value) => (
  <div className='flex items-center'>
   <div className='w-4/12'>
    <p className='label-font'>{title}</p>
   </div>
   <div className='w-3/5 ml-4 pl-3 currency_values'>
    <p className='pl-2'>{value}</p>
   </div>
  </div>
 );

 return (
  <div className='mt-4 grid grid-cols-12 mb-7'>
   <div className='claim_currency col-span-10 p-5'>
    <div className='grid grid-cols-2 gap-3'>
     {renderRowHeader('Foreign Currency')}
     {renderRowHeader('Local Currency')}

     {renderRow('Total Estimate', 200)}
     {renderRow('', 500)}

     {renderRow('Total Paid', 100)}
     {renderRow('', 200)}

     {renderRow('Balance', 500)}
     {renderRow('', 30000)}
    </div>
   </div>
  </div>
 );
};

export default ClaimCurrency;
