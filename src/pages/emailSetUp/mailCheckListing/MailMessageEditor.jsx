import React, { useRef, useState } from 'react';
import { mailList } from '../../../components/tableComponents/sampleData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MailMessageEditor = () => {
 const [editorHtml, setEditorHtml] = useState('');
 const quillRef = useRef(null);

 const handleFocus = (event, value) => {
  if (value) {
   insertTextAtCursor(value);
  }
  const target = event.currentTarget;
  //   onSelectValue(value);
  target.classList.add('focus-active');

  setTimeout(() => {
   target.classList.remove('focus-active');
  }, 2000);
 };

 const handleChange = html => {
  setEditorHtml(html);
 };

 const insertTextAtCursor = text => {
  const quill = quillRef.current.getEditor();
  const range = quill.getSelection();
  if (range) {
   quill.clipboard.dangerouslyPasteHTML(range.index, text);
   quill.setSelection(range.index + text.length, 0);
  }
 };

 const modules = {
  toolbar: [
   [{ header: [1, 2, 3, 4, 5, 6, false] }],
   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
   [{ size: [] }],
   [{ font: [] }],
   [{ align: ['right', 'center', 'justify'] }],
   [{ list: 'ordered' }, { list: 'bullet' }],
   ['link'],
   [{ color: ['red', '#785412'] }],
   [{ background: ['red', '#785412'] }],
  ],
 };

 return (
  <>
   <div className='col-span-11'>
    <p className='label-font select-none pl-1'>
     Message Body <span className='mandatory-symbol'>*</span>
    </p>
   </div>
   <div className='col-span-2 mt-2'>
    <div className='message_col'>
     {mailList?.map(item => (
      <p
       tabIndex={0}
       onClick={event => handleFocus(event, item?.label)}
       className='key_values'
       key={item?.value}>
       {item?.label}
      </p>
     ))}
    </div>
   </div>
   <div className='col-span-8 mt-2 ml-8'>
    <div>
     <ReactQuill
      ref={quillRef}
      value={editorHtml}
      onChange={handleChange}
      style={{ height: '100px' }}
      modules={modules}
      className='custom-quill-editor'
     />
    </div>
   </div>
  </>
 );
};

export default MailMessageEditor;
