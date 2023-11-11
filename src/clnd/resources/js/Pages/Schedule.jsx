import { useState } from "react";
import Schedule from "../scss/schedule.module.scss";
import CalenderUserPage from "./Calender";

function ScheduleForm() {

  // フォームデータ変数定義
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    requirement: '',
    memo: '',
  });

  // レスポンスデータ変数定義
  const [responseData, setResponseData] = useState(null);

  // フォームの表示・非表示の変数定義
  const [formSubmitted, setFormSubmitted] = useState(false);

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleForm({ ...scheduleForm, [name]: value});
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

    // リクエストを送信、レスポンスを受け取る
    fetch(scheduleApiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
    });
  }

  return(
    <div className={`${ Schedule.schedule } ${ formSubmitted ? Schedule.hidden: ''}`}>
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
      {/* { formSubmitted && (
        alert('フォームが送信されました')
      )} */}
      {/* カレンダーコンポーネントにレスポンスデータのみを渡す */}
      { responseData && <CalenderUserPage responseData={ responseData } />}
    </div>
  )
}

export default ScheduleForm;