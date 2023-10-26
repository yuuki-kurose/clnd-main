import React from 'react';
import common from '../css/common.module.css';

const Common = ({ title, children }) => {
  return (
    /**
     * task: headerの差し込み、main内のCSS設定
     */
    <div>
      <header>
        <div className={common.header}>
          <h1>{ title }</h1>
        </div>
      </header>
      <main>
        <div className={common.main}>
            { children }
        </div>
      </main>
      <footer>
        2023 example Application.
      </footer>
    </div>
  )
}

export default Common;