import React, { useState } from 'react';
import Common from '../Layout/common';
import Login from '../scss/login.module.scss';

function loginUserForm() {
  // ログインフォーム変数定義
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // エラー変数定義
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
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
      },
      body: JSON.stringify(loginForm)
    }

    // laravelからレスポンスデータ取得
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.message === "認証成功") {
          console.log(data.message);
          window.location.href = data.redirectTo;
        } else if(data.message === "認証失敗") {
          if(data.errors.email) {
            setErrors({
              email: data.errors.email,
              password: '',
            });
          } else if(data.errors.password) {
            /**
             * task: パスワードのエラーハンドリング見直し
             */
            setErrors({
              email: '',
              password: data.errors.password,
            });
          }
        }
      });
    };

    // Googleログイン
    const clickToGoogle = (event) => {
      event.preventDefault();
      const googleApiUrl = '/google';
      fetch(googleApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log('エラーが発生しました', error);
        })
    };

  return(
    <Common>
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
            <div>
              <button onClick={ clickToGoogle }>
                Google Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Common>
  )
}

export default loginUserForm;