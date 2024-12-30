import { Checkbox } from 'antd';

const CustomCheckBox = ({ options, onChange, value, size = 'large' }) => {
 const fieldSize = {
  small: { code: '1/3', desc: '2/3', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/4' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };

 return (
  <div className={`w-${fieldSize[size].main}`}>
   <Checkbox onChange={onChange} />
  </div>
 );
};

export default CustomCheckBox;
