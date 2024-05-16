import { useEffect, useRef, useState } from 'react';
import { Input, Popover } from 'antd';
import './CodeWithDescription.scss';

const Content = ({ width, options, handleSelected, selected }) => {
 const tableRefs = useRef([]);

 const scrollToRow = id => {
  const row = tableRefs.current.find(ref => {
   return ref.getAttribute('data-id') == id;
  });
  if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
 };

 useEffect(() => {
  scrollToRow(selected?.value);
 }, []);

 const handleKeyDown = (event, index) => {
  console.log('event.key  : ', event.key);
 };

 return (
  <div
   style={{ width: `${width - 40}px`, maxHeight: '200px' }}
   className='overflow-y-auto main-pop'>
   {options?.length > 0 ? (
    options?.map((item, index) => (
     <div
      onKeyDown={event => handleKeyDown(event, index)}
      tabIndex={0}
      data-id={item?.value}
      ref={ref => (tableRefs.current[index] = ref)}
      onClick={() => handleSelected(item)}
      key={item?.value}
      className={`popover-contents flex cursor-pointer ${
       selected?.value === item?.value ? 'selected-field-in-popover' : '456'
      }`}>
      <div className='w-2/5'>
       <p className='content-pop'>{item?.value}</p>
      </div>
      <div className='w-3/5 overflow-auto whitespace-normal'>
       <p className='content-pop'>{item?.label}</p>
      </div>
     </div>
    ))
   ) : (
    <p>No Data Found</p>
   )}
  </div>
 );
};

const CodeWithDescription = ({
 options = [],
 value,
 onChange,
 size = 'large',
 name,
 firstFieldRef = null,
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

 const useMergedRefs = (...refs) => {
  return node => {
   for (let ref of refs) {
    if (typeof ref === 'function') {
     ref(node);
    } else if (ref && 'current' in ref) {
     ref.current = node;
    }
   }
  };
 };

 useEffect(() => {
  if (inputContainerRef.current)
   setPopoverWidth(inputContainerRef.current.offsetWidth);
 }, []);

 useEffect(() => {
  if (firstFieldRef?.current) {
   firstFieldRef.current.focus();
   setOpen(true);
  }
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
  setOpen(visible);
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

 return (
  <div className='w-full  code-description'>
   <Popover
    content={
     <Content
      width={popoverWidth}
      options={dropOptions}
      handleSelected={handleSelected}
      selected={selected}
     />
    }
    placement='bottom'
    trigger='click'
    arrow={false}
    open={open}
    onOpenChange={handleVisibleChange}>
    <div
     className={`flex w-${fieldSize[size].main}`}
     ref={inputContainerRef}
     name={name}>
     <div className={`w-${fieldSize[size].code}`}>
      <Input
       className='code-field-popover'
       onChange={e => handleSearchDropDown(e.target.value)}
       value={selected?.value}
       placeholder='code'
       ref={useMergedRefs(inputRef)}
       onFocus={() => handlePreviousValue(selected?.value)}
       onBlur={() => handleOnBlurNotSelect()}
      />
     </div>
     <div className={`w-${fieldSize[size].desc} relative select-none`}>
      <Input
       className='description-field-popover pointer-events-none'
       value={selected?.label}
       placeholder='description'
       tabIndex={-1}
      />
     </div>
    </div>
   </Popover>
  </div>
 );
};

export default CodeWithDescription;
