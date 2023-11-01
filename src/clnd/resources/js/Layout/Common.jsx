import React from 'react';
import common from '../css/common.module.css';

const Common = ({ children }) => {
  return (
    /**
     * task: headerの差し込み、main内のCSS設定
     */
    <div>
      <header>
        <div className={common.header}>
          { /* ヘッダーコンテンツ */}
        </div>
      </header>
      <main>
        <div className={common.main}>
          { children }
        </div>
      </main>
      <footer>
        { /* フッターコンテンツ */ }
      </footer>
    </div>
  )
}

export default Common;