import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const HtmlEditor = ({ selectedValue, setSelectedValue }) => {
 const [editorHtml, setEditorHtml] = useState('');
 const quillRef = useRef(null);

 useEffect(() => {
  if (selectedValue) insertTextAtCursor(selectedValue);
  setSelectedValue('');
 }, [selectedValue, setSelectedValue]);

 const handleChange = html => {
  setEditorHtml(html);
 };

 const insertTextAtCursor = text => {
  const quill = quillRef.current.getEditor();
  const range = quill.getSelection();
  if (range) {
   quill.clipboard.dangerouslyPasteHTML(range.index, text);
   quill.setSelection(range.index + text.length, 0);
  } else {
   quill.focus();
   //insertTextAtCursor(text);
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

 const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'color',
  'image',
  'background',
  'align',
  'size',
  'font',
 ];

 return (
  <div
   onBlur={() => {
    // quillRef.current = null;
   }}>
   <ReactQuill
    ref={quillRef}
    value={editorHtml}
    onChange={handleChange}
    style={{ height: '100px' }}
    modules={modules}
    formats={formats}
    className='custom-quill-editor'
   />
  </div>
 );
};

export default HtmlEditor;
