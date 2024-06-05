import React, { createContext } from 'react';
import './Claim.scss';
import MainEntry from './mainEntry/MainEntry';
import SlidingCards from '../slidingCards/SlidingCards';

export const ClaimContext = createContext();

const Claim = () => {
 const data = {};
 return (
  <ClaimContext.Provider value={data}>
   <div className='claims quotation claim'>
    <div className='main-screen'>
     {/* <MainEntry /> */}
     <SlidingCards />
    </div>
   </div>
  </ClaimContext.Provider>
 );
};

export default Claim;
