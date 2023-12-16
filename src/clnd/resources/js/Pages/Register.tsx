import React, { useState } from 'react';
import Common from '../Layout/common';
import Register from '../scss/register.module.scss';

// ユーザー登録フォームの型
export interface initialUserContent {
  name: string;
  email: string;
  password: string;
};

function RegistrationForm() {

  // ユーザー登録フォームの変数定義
  const [formData, setFormData] = useState<initialUserContent>({
    name: '',
    email: '',
    password: '',
  });

  // csrfトークンの取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  // フォーム入力の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // フォーム送信処理
  const handleSubmit = (event) => {
    event.preventDefault();

    // laravelのエンドポイント
    const apiUrl = '/api/register';

    // 送信形態
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(formData),
    };

    // laravelからレスポンスデータ取得
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data) {
          window.location.href = data.redirect;
        }
      })
      .catch(error => {
        /**
         * task: エラー画面の作成・遷移
         */
        console.log('エラー', error);
      });
  }

  return (
    <Common>
      <div className={ Register.register}>
        <div>
          <h1 className={ Register.register__title }>ユーザー登録</h1>
        </div>
        <div>
          <form className={ Register.register__form } onSubmit={ handleSubmit }>
            {/* task: デザイン調整 */}
            <label>
              アカウント名:
              <input type="text" name="name" value={ formData.name } onChange={ handleChange } />
            </label>
            <label>
              メールアドレス:
              <input type="email" name="email" value={ formData.email } onChange={ handleChange } />
            </label>
            <label>
              パスワード:
              <input type="password" name="password" value={ formData.password } onChange={ handleChange } />
            </label>
            <div>
              <input type="submit" value="送信" />
            </div>
          </form>
        </div>
      </div>
    </Common>
  )
}

export default RegistrationForm;