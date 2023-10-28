import React, { useState } from 'react';
import Common from '../Layout/common';
import Register from '../css/register.module.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
    const apiUrl = 'http://localhost/api/register';
    console.log(apiUrl);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    console.log(requestOptions);
    // Postリクエストを送信
    fetch(apiUrl,requestOptions)
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      console.log('送信完了', data);
    })
    .catch(error => {
      console.log('エラー', error);
    });
  };

  return (
    <Common>
      <div>
        <div className={ Register.register}>
          <h1 className={ Register.register__title }>ユーザー登録</h1>
        </div>
        <div>
          <form className={ Register.register__form } onSubmit={ handleSubmit }>
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