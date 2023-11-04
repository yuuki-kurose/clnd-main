import React, { useState } from 'react';
import Common from '../Layout/common';
import Login from '../css/login.module.css';

function loginUserForm() {
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // csrfトークン取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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

    // 送信形態
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(loginForm)
    }
    console.log(requestOptions);

    // laravelからレスポンスデータ取得
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.message === '認証成功') {
          console.log(data.message);
          window.location.href = data.redirectTo;
        } else {
          console.log('error', data.message);
        }
      });
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
      </div>
    </Common>
  )
}

export default loginUserForm;