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

  // フォーム送信イベントの制御
  const [submitEvent, setSubmitEvent] = useState(false);

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleFormData({ ...scheduleFormData, [name]: value});
  };

  // props経由で関数を使用し、Feature.jsxに値を渡す
  const handleInputSubmit = async(event) => {
    event.preventDefault();
    handleAddEvent(scheduleFormData);
    setSubmitEvent(true);
  };

  // レスポンスデータをセットし、親（Calender .jsx)の関数を呼び出す
  const handleAddEvent = async(data) => {
    await passToResponseData(data);
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
          {/* 機能コンポーネントにフォームデータをまとめて渡す */}
          <FeatureOfForm formData={ scheduleFormData } handleAddEvent={ handleAddEvent } submitEvent={ submitEvent } />
        </form>
      </div>
    </div>
  );
};

export default ScheduleForm;