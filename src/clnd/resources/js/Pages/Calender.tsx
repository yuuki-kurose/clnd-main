import React, { useEffect, useState } from 'react';
import Calender from '../scss/calender.module.scss';
import ScheduleForm from './Schedule';
import { extendedResponseData } from './Feature';
import { initialResponseForm } from './Feature';

// Schedule.tsxに渡す関数の型
type passToResponseDataFunc = (data: extendedResponseData) => Promise<void>;
export interface propsFunc {
  passToResponseData: passToResponseDataFunc;
};

// CalenderUserPageをmemo化する
const CalenderUserPage = React.memo(function() {

  // ローカルストレージに保存されているIDの確認
  const userId = localStorage.getItem('userId');
  console.log('保存されていたユーザーID：', userId);

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth()+1);
  // カレンダーの日付を反映する関数を呼び出し
  const calender = createCalender(year, month);
  // 当月の最後日を取得
  const last = new Date(year, month, 0).getDate();
  // 前月の最後日を取得
  const prevlast = new Date(year,month-1, 0).getDate();

  // 予定作成フォームの状態を取得
  const [openForm, setOpenForm] = useState(false);
  // 予定作成フォームの表示/非表示
  const handleClick = () => {
    setOpenForm(!openForm);
  };

  // Schedule.jsxから値が返ってくるので取得・更新し、フォームを閉じる
  const [responseViewData, setResponseViewData] = useState<extendedResponseData>();
  const [formToFilterData, setFormToFilterData] = useState<initialResponseForm[]>();
  const passToResponseData: passToResponseDataFunc = async(data) => {
    setResponseViewData(data);
    setOpenForm(!openForm);
  };
  // レスポンスデータが渡ってきたら検知し、必要なデータのみセットする
  useEffect(() => {
    if(responseViewData && responseViewData.selectedDate && responseViewData.formFilterData) {
      setFormToFilterData(responseViewData.formFilterData);
    };
  }, [formToFilterData]);

  // カレンダービュー部分
  return (
    <div>
      <div className={ Calender.calender }>
        <div className={ Calender.calender__header }>
          <div>
            <h1 className={ Calender.calender__title }>{`${ year }年${ month }月`}</h1>
          </div>
          <div className={ Calender.calender__list }>
            <button>⇦先月</button>
            <button>翌月⇨</button>
          </div>
        </div>
        <div>
          <table border={1} bgcolor="white" width="100%">
            <thead>
              <tr>
                <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
              </tr>
            </thead>
            <tbody>
              {calender.map((week, i) => (
                // week内には週ごとの配列が入っているのでjoin('')で繋げる
                <tr key={week.join('')}>
                  {week.map((day, j) => {
                    // ユーザー選択日とビュー上の日にちが一致するか調べる
                    const dayData = formToFilterData?.filter(item => {
                      if (item.date) {
                      // ユーザー選択日を取得する
                      const itemDate: number = new Date(item.date).getDate();
                      // console.log(`Item Date: ${itemDate}, Day: ${day}`);
                      return itemDate === day;
                      }
                      return false;
                    });
                    // return()で親に返す
                    return (
                      <td key={`${i}${j}`} id={day}>
                        <div>
                          <div className={Calender.calender__inner}>
                            {/* 条件に当てはまらなければ、そのままdayを返す */}
                            {day > last ? day - last : day <= 0 ? prevlast + day : day}
                          </div>
                          <div className={Calender.calender__content}>
                            {/* dayDataを使用して、ユーザー選択日に紐付くデータを表示させる */}
                            {dayData?.map(item => ( 
                              <p key={item.id} className={Calender.calender__detail}>{item.requirement}</p>
                            ))}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {/* 予定作成フォームコンポーネントの呼び出し */}
          <div>
            <button className={ Calender.calender__btn }
                    onClick={ handleClick }
            >+
            </button>
            { openForm && <ScheduleForm passToResponseData={ passToResponseData } />}
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * カレンダー表示に使用する関数
 */
function createCalender(year, month) {
  // 5週分の行を用意
  const weekArray = [0,1,2,3,4];
  // 7日分の列を用意
  const dayArray = [0,1,2,3,4,5,6];
  // 今月１日の曜日を取得する
  const firstDay = new Date(year, month-1, 1).getDay();

  // 1週に７日分を埋め込む
  return weekArray.map((weekNum) => {
    return dayArray.map((dayNum) => {
      // 日付を正しい表記にする
      const day = dayNum + 1;
      // console.log(day);
      // 週ごとに７日ずつ増えるので７をかける
      const week = weekNum * 7;
      // console.log(week);
      // 1週ごとの日付を計算し、取得する
      const estimation = day + week;
      // console.log(estimation);
      // 最初の曜日から引くことで、前月の日にちの曜日を取得する
      return estimation - firstDay;
    });
  });
};
// console.log(createCalender(2023, 11));

export default CalenderUserPage;
