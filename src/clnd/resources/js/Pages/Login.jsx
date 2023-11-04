import React, { useState, useEffect } from 'react';
import Common from '../Layout/common';
import Login from '../css/login.module.css';

function loginUserForm() {
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    setCsrfToken(csrfToken);
  },[]);

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setLoginForm({ ...loginForm, [name]: value });
  }

  // ログインフォーム送信
  const handleSubmit = (event) => {
    event.preventDefault();

    // エンドポイント
    const apiUrl = '/api/login';

    // ユーザー登録時に発行された認証トークンを含める
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(loginForm)
    }

    // laravelからレスポンスデータ取得
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.token) {
          localStorage.setItem('authToken', data.token);
          next('/calender');
        } else {

        }
      })
  }
    
  const googleSubmit = (event) => {
    event.preventDefault();

    const googleApiUrl = '/api/auth/google';
    const googleRequestOptions = {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      }
    };

    fetch(googleApiUrl, googleRequestOptions)
      .then(response => response)
      .then(data => {
        
      })
  }

  return(
    <Common>
      <div className={ Login.login }>
        <h1 className={ Login.login__title }>ログイン</h1>
      </div>
      <div>
        <form className={ Login.login__form } onSubmit={ handleSubmit }>
          <label>
            メールアドレス:
            <input type="email" name="email" value={ loginForm.email } onChange={ handleChange } />
          </label>
          <label>
            パスワード:
            <input type="password" name="password" value={ loginForm.password } onChange={ handleChange } />
          </label>
          <div>
            <input type="submit" value="ログイン" />
          </div>
        </form>
        <form onSubmit={ googleSubmit }>
          <div>
            <input type="hidden" name="_token" value={ csrfToken } />
            <input type="submit" value="Googleでログイン" />
          </div>
        </form>
      </div>
    </Common>
  )
}

export default loginUserForm;