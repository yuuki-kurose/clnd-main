import React, { useState } from 'react';
import Schedule from "../scss/schedule.module.scss";
import { postFormData } from './Feature';

const ScheduleForm = ({ passToResponseData }) => {
  // フォームデータ変数定義
  const [scheduleFormData, setScheduleFormData] = useState({
    date: '',
    requirement: '',
    memo: '',
  });

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleFormData({ ...scheduleFormData, [name]: value});
  };

  // Feature.jsxにあるpostFormData()を呼び出す
  const handleInputSubmit = async(event) => {
    event.preventDefault();
    // csrfトークン取得
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    // responseに、バックエンドからのレスポンスが代入される
    const response = await postFormData({
      csrfToken,
      data: scheduleFormData,
    });
    if(response !=null) {
      await passToResponseData(response);
    } else {
      console.log('データがありません');
    }
  };

  return(
    <div>
      <div className={ Schedule.schedule }>
        <form className={ Schedule.schedule__form }
              onSubmit={ handleInputSubmit }
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
    </div>
  );
};

export default ScheduleForm;