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

  // フォーム送信
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Common>
      <div>
        <div className="Register.user-register">
          <h1 className="Register.user-register__title">ユーザー登録</h1>
        </div>
        <div>
          <form onSubmit={ handleSubmit }>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <input type="submit" value="送信" />
          </form>
        </div>
      </div>
    </Common>
  )
}

export default RegistrationForm;