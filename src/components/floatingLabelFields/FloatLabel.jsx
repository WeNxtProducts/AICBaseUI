import { useState } from 'react';
import './FloatLabel.scss';

const FloatLabel = ({ children, label, value }) => {
 const [focus, setFocus] = useState(false);

 const labelClass = focus || (value && value.length !== 0) ? 'label label-float' : 'label';

 return (
  <div
   className={`float-label ${focus || (value && value.length !== 0) ? 'focused' : ''}`}
   onBlur={() => setFocus(false)}
   onFocus={() => setFocus(true)}>
   {children}
   <label className={labelClass}>{label}</label>
  </div>
 );
};

export default FloatLabel;
