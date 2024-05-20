import { useState, useEffect } from 'react';

const useMobileDetect = () => {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const handleResize = () => {
   const userAgent =
    typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
   const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
   setIsMobile(mobileRegex.test(userAgent));
  };
 

  handleResize(); // Check on initial load

  window.addEventListener('resize', handleResize);
  return () => {
   window.removeEventListener('resize', handleResize);
  };
 }, []);

 return isMobile;
};

export default useMobileDetect;
