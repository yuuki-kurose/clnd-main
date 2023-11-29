// レスポンスデータ内のformFilterDataの型
export interface initialResponseForm {
  id: number;
  date: string;
  requirement: string;
  memo: string;
  created_at: string;
  updated_at: string;
};

// レスポンスデータの型
export interface extendedResponseData extends initialResponseForm {
  formFilterData: [];
  message: string;
  selectedDate: string;
}

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
    const responseData: extendedResponseData = await response.json();
    console.log('返ってきたデータ：', responseData, typeof responseData);
    return responseData;
  } catch(error) {
      console.log(error);
      return undefined;
  };
};
