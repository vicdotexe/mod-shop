import React from "react";
import Editor from "./Editor";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostView from "./PostView";
import Posts from "./Posts";

export default () => (
  <>
    <h1>Welcome to React Vite Micro App!</h1>
    <p>Hard to get more minimal than this React app.</p>
    <Router>
      <Routes>
        <Route path="/posts" element={<Posts></Posts>}></Route>
        <Route path="/posts/edit/:id" element={<PostView></PostView>}></Route>
      </Routes>
    </Router>
  </>
);
