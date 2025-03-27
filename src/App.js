// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import POUpload from './pages/POUpload';
import POList from './pages/POList';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Layout from './components/Layout';
import './App.css';

function App() {
  // ユーザー認証状態をチェック
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // トークンが存在すればtrue、なければfalse
  };

  // 認証が必要なルートのラッパー
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return <Layout>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        {/* 認証ページ */}
        <Route path="/login" element={<Login />} />
        
        {/* メインページ */}
        <Route path="/" element={
          <ProtectedRoute>
            <POUpload />
          </ProtectedRoute>
        } />
        
        {/* PO一覧ページ */}
        <Route path="/po/list" element={
          <ProtectedRoute>
            <POList />
          </ProtectedRoute>
        } />
        
        {/* 旧パスでのアクセス対応（後方互換性） */}
        <Route path="/list" element={<Navigate to="/po/list" />} />
        
        {/* ブッキングページ */}
        <Route path="/booking" element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        } />
        
        {/* 存在しないパスへのアクセス */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
