import React, { useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormImageUpload } from './utils/API';

export default function Editor() {
    const [value, setValue] = useState('');
    const [id, setId] = useState('');
    const quillRef = useRef();
  
    const imageHandler = (e) => {
      const editor = quillRef.current.getEditor();
      console.log(editor)
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
  
      input.onchange = async () => {
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
          console.log(file);
          const formData = new FormData();
          formData.append("image", file);
          const url = await FormImageUpload(formData); // upload data into server or aws or cloudinary
        //   const url = res?.data?.url;
          editor.insertEmbed(editor.getSelection(), "image", url);
        } else {
          alert('You could only upload images.');
        }
      };
    }

    const onPost = (e)=>{
        e.preventDefault();
        const editor = quillRef.current.getEditor();
        fetch('http://localhost:3001/posts', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                content:value
            })
        });
    }
    
    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', "strike"],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['image', "link",],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
        ],
        handlers: {
          image: imageHandler
        }
      },
    }), [])

    const fill = async(e) =>{
        e.preventDefault();
        const resp = await fetch(`http://localhost:3001/posts/${id}`);
        const data = await resp.json();
        setValue(data.content);
    }

    return <>
    <ReactQuill 
    ref={quillRef}
    theme="snow" 
    value={value} 
    onChange={setValue}               
    modules={modules}   />
    <button onClick={onPost}>Post</button>
    <input onChange={(e)=>{setId(e.target.value)}}></input>
    <button onClick={fill}>fill</button>
    </>;
}
