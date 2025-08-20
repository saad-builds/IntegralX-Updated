import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import HomePage from './components/Homepage/HomePage.js';
import AboutPage from './components/AboutUs/AboutUsPage.js';
import ContactUsPage from './components/ContactUs/ContactUsPage.js';
import ProjectPage from './components/ProjectPage/ProjectPage.js';
import ViewBlogsPage from './components/Blogs/ViewBlogsPage.js';
import BlogPostPage from './components/Blogs/BlogPostPage.js';

import './App.css';
import Projects from './components/ProjectPage/Projects.js';

function App() {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/projects/:projectSlug" element={<ProjectPage />} />
        <Route path="/blogs" element={<ViewBlogsPage />}/>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


