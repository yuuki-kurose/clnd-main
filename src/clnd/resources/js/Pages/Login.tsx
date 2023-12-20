import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

import Common from '../Layout/Common';
import Login from '../scss/login.module.scss';
import { initialUserContent } from './Register';

// ログインレスポンスデータの型
interface loginUserData {
  message: string;
  redirectTo: string;
  token: string;
};

function LoginUserForm() {

  // ログインフォーム変数定義
  const [loginForm, setLoginForm] = useState<initialUserContent>({
    name: '',
    email: '',
    password: '',
  });

  // エラー変数定義
  const [errors, setErrors]= useState({
    email: '',
    password: '',
  });

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // エンドポイント
  const apiUrl = '/api/login';

  // csrfトークンの取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  // 認証トークンの取得
  const attemptToken = localStorage.getItem('token_name');

  // ログインリクエスト・レスポンス取得
  const handleSubmit = async(event) => {
    event.preventDefault();

    // 初回ログイン時に、認証トークンを保持し以降はリクエストヘッダーに含める
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(attemptToken && { 'Authorization': `Bearer ${ attemptToken }`}),
          'X-CSRF-TOKEN': csrfToken ?? '',
        },
        body: JSON.stringify(loginForm)
      });
      // レスポンスデータ取得
      const responseLoginData: loginUserData = await response.json();

      // 認証トークンをローカルストレージに保存し、カレンダーページへ遷移
      if(responseLoginData) {
        localStorage.setItem('token_name', responseLoginData.token);
        window.location.href = responseLoginData.redirectTo;
      }
    } catch(error) {
      console.log('エラーになりました', error);
    };
  };

  return(
    <Common>
      {/* ログインビュー定義 */}
      <div className={ Login.login }>
        <div>
          <h1 className={ Login.login__title }>ログイン</h1>
        </div>
        <div>
          <form className={ Login.login__form } onSubmit={ handleSubmit }>
            {/* task: デザイン調整 */}
            <label>
              メールアドレス:
              <input  type="email"
                      name="email"
                      value={ loginForm.email }
                      onChange={ handleChange }
              />
              { errors.email && <div className={ Login.login__error }>{ errors.email }</div> }
            </label>
            <label>
              パスワード:
              <input  type="password"
                      name="password"
                      value={ loginForm.password }
                      onChange={ handleChange }
              />
              { errors.password && <div className={ Login.login__error }>{ errors.password }</div> }
            </label>
            {/* 通常ログイン */}
            <div>
              <input type="submit" value="ログイン" />
            </div>
            {/* Googleログイン */}
            <div className={ Login.login__google }>
              <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_CLIENT_ID }>
                <ProsessToProvider />
              </GoogleOAuthProvider>
            </div>
          </form>
        </div>
      </div>
    </Common>
  );
};

// Googleログイン処理
export function ProsessToProvider() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  });

  return (
    <button onClick={ login }>Google Login</button>
  );
};

export default LoginUserForm;