import React from 'react';
import Layout from '../scss/common/layout.module.scss';
import HeaderCommon from './header';

const Common = ({ children }) => {
  return (
    <div>
      <HeaderCommon />
      <main>
        <div className={ Layout.main }>
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