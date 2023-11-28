import React, { useState } from 'react';
import Schedule from "../scss/schedule.module.scss";
import { postFormData } from './Feature';
import { extendedResponseData } from './Feature';
import { propsFunc } from './Calender';

const ScheduleForm: React.FC<propsFunc> = ({ passToResponseData }) => {
  
  // フォームデータの型
  interface initialForm {
    date: Date;
    requirement: string;
    memo: string;
  };

  // フォームデータ変数定義
  const [scheduleFormData, setScheduleFormData] = useState<initialForm>({
    date: new Date(),
    requirement: '',
    memo: '',
  });

  // 入力内容の反映
  const handleChange = (event) => {
    const { name, value } = event.target;
    setScheduleFormData({ ...scheduleFormData, [name]: value});
    console.log(typeof scheduleFormData.requirement);
  };

  // Feature.jsxにあるpostFormData()を呼び出す
  const handleInputSubmit = async(event) => {
    event.preventDefault();
    // csrfトークン取得
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    // csrfTokenに対し、検証を行う
    if(!csrfToken) {
      console.log('csrfTokenが見つかりません');
      return
    }
    // responseに、バックエンドからのレスポンスが代入される
    const response: extendedResponseData | undefined = await postFormData({
      csrfToken,
      data: scheduleFormData,
    });
    if(response != undefined) {
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