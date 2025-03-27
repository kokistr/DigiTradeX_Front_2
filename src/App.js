// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import POUpload from './pages/POUpload';
import POList from './pages/POList';
import Booking from './pages/Booking';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* メインページ */}
        <Route path="/" element={
          <Layout>
            <POUpload />
          </Layout>
        } />
        
        {/* PO一覧ページ */}
        <Route path="/po/list" element={
          <Layout>
            <POList />
          </Layout>
        } />
        
        {/* 旧パスでのアクセス対応（後方互換性） */}
        <Route path="/list" element={<Navigate to="/po/list" />} />
        
        {/* ブッキングページ */}
        <Route path="/booking" element={
          <Layout>
            <Booking />
          </Layout>
        } />
        
        {/* 存在しないパスへのアクセス */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
