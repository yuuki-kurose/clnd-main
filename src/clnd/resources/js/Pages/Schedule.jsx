import React, { useState } from 'react';
import Schedule from "../scss/schedule.module.scss";
import FeatureOfForm from './Feature';

const ScheduleForm = ({ passToResponseData }) => {
  // フォームデータ変数定義
  const [scheduleFormData, setScheduleFormData] = useState({
    date: '',
    requirement: '',
    memo: '',
  });

   // フォームの表示・非表示の変数定義
   const [formSubmitted, setFormSubmitted] = useState(true);

   // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleFormData({ ...scheduleFormData, [name]: value});
    console.log(scheduleFormData);
  };

  // props経由で関数を使用し、Feature.jsxに値を渡す
  const handleInputSubmit = (event) => {
    event.preventDefault();
    setScheduleFormData(scheduleFormData);
    setFormSubmitted(false);
  };

  // レスポンスデータをセットし、親（Calender .jsx)の関数を呼び出す
  // task: カレンダーコンポーネント内にpassToResponseDataの定義を行う
  const handleAddEvent = (data) => {
    passToResponseData(data);
  };

  return(
    <div>
      { formSubmitted && (
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
            {/* 機能コンポーネントにフォームデータを渡す */}
            <FeatureOfForm scheduleFormData={ scheduleFormData } handleAddEvent={ handleAddEvent } />
          </form>
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;