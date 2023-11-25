// APIルート
const scheduleApiUrl = '/api/schedule';

// フォームデータの送信・レスポンスの取得
export const postFormData = async({ csrfToken, data }) => {
  try {
    const response = await fetch(scheduleApiUrl, {
      method: 'POST',
      headers: {
        'CONTENT-TYPE': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(data)
    });
    if(!response.ok) {
      throw new Error('エラーが出ました');
    };
    return response.json();
  } catch(error) {
      console.log(error);
      return undefined;
  };
};
