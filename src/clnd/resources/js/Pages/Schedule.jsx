import { useState } from "react";
import Common from "../Layout/common";
import Schedule from "../css/schedule.module.css";

function ScheduleForm() {

  // フォームデータ変数定義
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    requirement: '',
    memo: '',
  });

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleForm({ ...scheduleForm, [name]: value});
    console.log(scheduleForm);
  }

  // csrfトークン取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // フォームデータ送信
  const handleSubmit = (event) => {
    event.preventDefault();

    // API定義
    const scheduleApiUrl = '/api/schedule';

    // 送信形態
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(scheduleForm)
    };

    fetch(scheduleApiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return(
    <Common>
      <div className={ Schedule.schedule }>
        <form className={ Schedule.schedule__form }
              onSubmit={ handleSubmit }
        >
          <label className={ Schedule.schedule__label }>
            日付：
            <input  type="date"
                    name="date"
                    placeholder="日付の選択をしてください"
                    className={ Schedule.schedule__content }
                    onChange={ handleChange }
            />
          </label>
          <label className={ Schedule.schedule__label }>
            要件：
            <input  type="text"
                    name="requirement"
                    placeholder="内容を入力してください"
                    className={ Schedule.schedule__content }
                    onChange={ handleChange }
            />
          </label>
          <label className={ Schedule.schedule__label }>
            メモ：
            <textarea className={ Schedule.schedule__content }
                      name="memo"
                      onChange={ handleChange }
            >
            </textarea>
          </label>
          <div>
            <input  type="submit"
                    value="作成"
            />
          </div>
        </form>
      </div>
    </Common>
  )
}

export default ScheduleForm;