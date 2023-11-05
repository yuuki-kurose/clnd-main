import React, { useState }  from 'react';
import Common from '../Layout/common';
import Calender from '../css/calender.module.css';

function calenderUserPage() {
  // 現在の年月を取得
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()+1);

  // カレンダーに反映する関数
  const calender = createCalender(year, month);

  // 当月の最後日
  const last = new Date(year, month, 0).getDate();
  console.log(last);
  // 前月の最後日
  const prevlast = new Date(year,month-1, 0).getDate();
  console.log(prevlast);


  return(
    <Common>
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
              { calender.map((week,i) => (
                <tr key={ week.join('') }>
                  { week.map((day,j) => (
                    <td key={ `${i}${j}` } id={day}>
                      <div>
                        <div className={ Calender.calender__inner }>
                          {day > last ? day - last : day <= 0 ? prevlast + day : day }
                        </div>
                        <div> 
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Common>
  )
}

function createCalender(year, month) {
  const firstDay = new Date(year, month -1, 1).getDay();
  console.log(firstDay);
  return [0,1,2,3,4].map((weekIndex) => {
    return [0,1,2,3,4,5,6].map((dayIndex) => {
        const day = dayIndex + 1 + weekIndex * 7
        return day - firstDay
    })
  })
}

export default calenderUserPage;