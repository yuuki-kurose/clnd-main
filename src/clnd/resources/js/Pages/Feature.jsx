import React, { useState, useEffect } from "react";

const FeatureOfForm = ({ formData, handleAddEvent, submitEvent }) => {
  // レスポンスデータを格納する変数定義
  const [updateEvents, setUpdateEvents] = useState('');
 
  // csrfトークン取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // APIルート
  const scheduleApiUrl = '/api/schedule';

  // フォームデータの送信・レスポンスの取得
  const handleSubmit = async() => {
    try {
      const response = await fetch(scheduleApiUrl, {
        method: 'POST',
        headers: {
          'CONTENT-TYPE': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(formData)
      });
      if(!response.ok) {
        throw new Error('エラーが出ました');
      }
      const data = await response.json();
      setUpdateEvents(data);

      // 子（Schedule.jsx）コンポーネントの関数を使用する
      handleAddEvent(data);
    } catch(error) {
      console.log(error);
    }
  };

  // Schedule.jsxで送信イベントが行われた場合のみ、バックエンドとのやり取りを行う
  useEffect(() => {
   handleSubmit(formData);
  }, [submitEvent]);
};

export default FeatureOfForm;