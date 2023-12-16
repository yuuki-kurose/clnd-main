import React from "react";
import { Link } from "react-router-dom";
import Common from "../Layout/Common";
import Home from '../scss/home.module.scss';

const Welcome = () => {
  return (
    <Common>
      <div className={ Home.home }>
        <div className={ Home.home__box }>
          <h1 className={ Home.home__title }>スケジュール管理をはじめよう</h1>
          <div className={ Home.home__group }>
            <Link to="/register" className={ Home.home__group__button }>会員登録</Link>
            <Link to="/login" className={ Home.home__group__button }>ログイン</Link>
          </div>
        </div>
      </div>
    </Common>
  );
};

export default Welcome;
