import React, { useState } from 'react';
import Common from '../Layout/common';
import Register from '../scss/register.module.scss';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // csrfトークンの取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // フォーム入力の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
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
    console.log(requestOptions);

    // laravelからレスポンスデータ取得
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('送信完了', data);
        if(data.redirect) {
          window.location.href = data.redirect;
        }
      })
      .catch(error => {
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