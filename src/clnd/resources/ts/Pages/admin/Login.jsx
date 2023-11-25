import React, { useState } from 'react';
import Common from '../../Layout/common';
import Admin from '../../scss/admin.module.scss';

function AdminLoginForm() {
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  const handleSubmit = (event) => {
    const apiUrl = '/api/AdminLogin';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.csrfToken,
      },
      body: JSON.stringify(loginForm)
    }
  
    fetch(apiUrl, requestOptions)
      .then(request => request.json())
      .then(error => {
        console.log('エラー', error);
      })
  }

  return(
    <Common>
      <div className={ Admin.admin }>
        <h1 className={ Admin.admin__title }>管理者用ログイン</h1>
      </div>
      <div>
        <form className={ Admin.admin__form } onSubmit={ handleSubmit }>
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

export default AdminLoginForm;