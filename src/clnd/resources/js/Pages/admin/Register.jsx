import React, { useState } from 'react';
import Common from '../../Layout/common';
import Admin from '../../css/admin.module.css';

function AdminRegistrationForm() {
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
    const apiUrl = '/api/AdminRegister';

    // 送信形態
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.csrfToken,
      },
      body: JSON.stringify(formData),
    };
    console.log(requestOptions);

    // laravelからレスポンスデータ取得
    fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('送信完了', data);
      })
      .catch(error => {
        console.log('エラー', error);
      });
  }

  return (
    <Common>
      <div>
        <div className={ Admin.admin}>
          <h1 className={ Admin.admin__title }>管理者登録</h1>
        </div>
        <div>
          <form className={ Admin.admin__form } onSubmit={ handleSubmit }>
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

export default AdminRegistrationForm;