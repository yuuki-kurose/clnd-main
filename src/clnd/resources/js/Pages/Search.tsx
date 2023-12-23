import React, { useEffect, useState } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import { InertiaLink } from '@inertiajs/inertia-react';

import Search from '../scss/search.module.scss';

/**
 * レスポンスデータの型定義
 */
interface initialPostData {
  id: number,
  requirement: string,
  memo: string,
  date: Date,
};

const SearchToUserData = () => {

  // ローディング管理
  const [loading, setLoading] = useState(true);

  // レスポンスデータ管理
  const [searchUserData, setSearchUserData] = useState('');

  // APIエンドポイント
  const apiUrl = '/api/searchData';

  // 認証トークンの取得
  const attemptToken = localStorage.getItem('token_name');

  // csrfトークンの取得
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  // 認証トークンを使用し、データの検索・取得を行う
  async function getUserData(): Promise<initialPostData | undefined> {
    try {
      const attemptPostData = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'CONTENT-TYPE': 'application/json',
          'Authorization': `Bearer ${ attemptToken }`,
          'X-CSRF-TOKEN': csrfToken ?? '',
        },
      });
      // レスポンスデータ取得
      const responseUserPostData: initialPostData = await attemptPostData.json();
      console.log('レスポンスに含まれたデータ：', responseUserPostData);
      setSearchUserData(responseUserPostData);
      // Inertia.reload({ preserveScroll: true });
      setLoading(false);
      return responseUserPostData;
    } catch(error) {
      console.log(error);
      setLoading(false);
      return undefined;
    }
  };

  // コンポーネントが読み込まれた際に、データの検索・取得を行う
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={ Search.loader }>
      { loading ? (
        <p className={ Search.loader__content }>Loading...</p>
      ):(
        <div>
          準備ができました
        </div>
      )}
    </div>
  );
};

export default SearchToUserData;