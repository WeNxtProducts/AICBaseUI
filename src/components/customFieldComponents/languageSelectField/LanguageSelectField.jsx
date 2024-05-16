import { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'antd';
import flags from '../../../assets/Flag_of_the_United_Kingdom.png';
import './LanguageSelectField.scss';

const LanguageSelectField = ({
 options = [],
 value,
 onChange,
 size = 'large',
}) => {
 const fieldSize = {
  small: { code: '1/4', desc: '3/4', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };
 const [dropOptions, setDropOptions] = useState(options);
 const inputRef = useRef(null);
 const inputContainerRef = useRef(null);
 const [popoverWidth, setPopoverWidth] = useState(0);
 const [open, setOpen] = useState(false);
 const [selected, setSelected] = useState({});
 const [preValue, setPreValue] = useState('');

 useEffect(() => {
  if (inputContainerRef.current)
   setPopoverWidth(inputContainerRef.current.offsetWidth);
 }, []);

 useEffect(() => {
  const currentValueObj = options?.find(item => {
   return item?.value == value;
  });
  if (currentValueObj !== undefined) setSelected(currentValueObj);
 }, [value]);

 useEffect(() => {
  if (open && inputRef.current) inputRef.current.focus();
 }, [open]);

 const handleVisibleChange = visible => {
  if (!visible) setSelected(prev => ({ ...prev, value: preValue }));
  setOpen(false);
 };

 const handleSelected = mainVal => {
  onChange(mainVal);
  setPreValue({});
  setSelected(mainVal);
 };

 const handlePreviousValue = pre => {
  inputRef.current.select();
  setPreValue(pre);
 };

 const handleOnBlurNotSelect = () => {
  setTimeout(() => {
   setDropOptions(options);
   setOpen(false);
  }, 200);
 };

 function searchOptions(query) {
  const lowerCaseQuery = query.toLowerCase();
  return options.filter(
   option =>
    option.label.toLowerCase().includes(lowerCaseQuery) ||
    option.value.toString().includes(lowerCaseQuery),
  );
 }

 const handleSearchDropDown = search => {
  const filteredOptions = searchOptions(search);
  setDropOptions(filteredOptions);
  setSelected(prev => ({ ...prev, value: search }));
 };

 const items = [
  // {
  //  label: <a href='https://www.antgroup.com'>1st menu item</a>,
  //  key: '0',
  // },
  // {
  //  label: <a href='https://www.aliyun.com'>2nd menu item</a>,
  //  key: '1',
  // },
  //
  {},
  // {
  //  label: '3rd menu item',
  //  key: '3',
  // },
 ];

 return (
  <div className='w-full'>
   <Dropdown
    menu={{
     items,
    }}
    trigger={['click']}>
    <div
     className={`flex w-${fieldSize[size].main} lang-field-select cursor-pointer place-content-end`}
     ref={inputContainerRef}>
     <div className='w-1/2 flex'>
      <div className='flex items-center'>
       <img className='logo-resize-flag' alt='logo' src={flags} />
       <p className='pl-2 selected-lang select-none'>English</p>
      </div>
      <div className='arrow-icon'>
       <i className='bi bi-chevron-down'></i>
      </div>
     </div>
    </div>
   </Dropdown>
  </div>
 );
};

export default LanguageSelectField;
