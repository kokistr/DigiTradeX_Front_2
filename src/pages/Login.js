// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // トークンがあれば自動ログイン
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // トークン検証
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // トークン検証API呼び出し（実装されている場合）
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.valid) {
        navigate('/');
      } else {
        // 無効なトークンを削除
        localStorage.removeItem('token');
      }
    } catch (error) {
      // 検証エラー時はトークンを削除
      localStorage.removeItem('token');
      console.error('Token verification failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // 入力検証
    if (!email || !password) {
      setErrorMessage('メールアドレスとパスワードを入力してください');
      setIsLoading(false);
      return;
    }

    try {
      // ログインリクエスト
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      // 成功時の処理
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // ユーザー情報があれば保存
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        navigate('/');
      } else {
        throw new Error('トークンが見つかりません');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // エラーメッセージの設定
      if (error.response) {
        // サーバーからのエラーレスポンス
        if (error.response.status === 401) {
          setErrorMessage('メールアドレスとパスワードを確認してください');
        } else {
          setErrorMessage(error.response.data?.message || 'ログインに失敗しました');
        }
      } else if (error.request) {
        // リクエストは送信されたがレスポンスなし
        setErrorMessage('サーバーに接続できません。ネットワーク接続を確認してください');
      } else {
        // その他のエラー
        setErrorMessage(error.message || 'ログイン処理中にエラーが発生しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // テスト用の自動ログイン（開発環境のみ）
  const handleDevLogin = () => {
    // 開発環境でのみ動作
    if (process.env.NODE_ENV === 'development') {
      // ダミートークンをローカルストレージに保存
      localStorage.setItem('token', 'dummy-dev-token');
      
      // ダミーユーザー情報
      const dummyUser = {
        id: 1,
        name: 'テストユーザー',
        email: 'test@example.com',
        role: 'admin'
      };
      
      localStorage.setItem('user', JSON.stringify(dummyUser));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">DigiTradeX</h1>
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">メールアドレス</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@company.com"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">パスワード</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4">
            <button
              onClick={handleDevLogin}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              開発用自動ログイン
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
