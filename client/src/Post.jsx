import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Post({postData}) {
    const navigate = useNavigate();

  return (
    <div className='postCard'>
        <h2>{postData.title}</h2><button onClick={(e)=>{
            e.preventDefault();
            navigate(`/posts/edit/${postData._id}`)
        }}>Edit</button>
        <p>{postData.createdAt}</p>
        <div dangerouslySetInnerHTML={{__html:postData.content}}></div>
    </div>
  )
}
