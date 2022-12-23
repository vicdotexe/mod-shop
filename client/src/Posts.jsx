import React, { useEffect, useState } from 'react'
import Post from './Post';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3001/posts').then(resp=>{
            if (resp.ok){
                return resp.json();
            }
        }).then(data=>{
            setPosts(data);
        })
    },[])
  return (
    <div>
        {posts.map((post,index)=>{
            return <Post postData={post} key={index}/>
        })}
    </div>
  )
}
