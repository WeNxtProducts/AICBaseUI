import React from 'react';
import { SelectInput, TextInput, DateInput } from '@float-Input';

const BasicInformation = () => {
 return (
  <div className='basic_information mt-1'>
   <p>Basic Information</p>
   <div className='basic_form grid grid-cols-9 gap-x-6 gap-y-3'>
    <div className='col-span-3'>
     <SelectInput
      label='Title'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='First Name'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='Middle Name'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='Last Name'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
    <div className='col-span-3'>
     <DateInput
      label='Date of Birth'
      value={''}
      onChange={date => console.log(date)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Gender'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='Mobile No'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='Email ID'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Plan Term in Years'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Currency'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='Sum Assured in AED'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Premium Frequency'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Occupation Category'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Occupation'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Nationality'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Smoker'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <SelectInput
      label='Country Of residence'
      value={''}
      onChange={value => console.log(value)}
     />
    </div>
    <div className='col-span-3'>
     <TextInput
      label='Promo Code'
      value={''}
      onChange={e => console.log(e.target.value)}
     />
    </div>
   </div>
   <div className='mt-5 w-full flex justify-end pr-10'>
    <button className='process_button'>Get Quote</button>
   </div>
  </div>
 );
};

export default BasicInformation;
