import React from 'react';

const Layout = ({ title, children }) => {
  return (
    /**
     * task: headerの差し込み、main内のCSS設定
     */
    <div>
      <header>
        <h1>{ title }</h1>
      </header>
      <main>
        { children }
      </main>
      <footer>
        2023 example Application.
      </footer>
    </div>
  )
}

export default Layout;