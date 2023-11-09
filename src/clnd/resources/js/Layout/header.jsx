import React from 'react';
import Header from '../scss/common/header.module.scss';

function HeaderCommon() {
  return(
    <header>
      <div className={ Header.header }>
        <div>
          <ul className={ Header.header__group }>
            <li>
              <a href='' className={ Header.header__link }>About</a>
            </li>
            <li>
              <a href='' className={ Header.header__link }>login</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default HeaderCommon;