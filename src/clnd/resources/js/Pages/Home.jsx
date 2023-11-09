import Common from "../Layout/common";
import Home from "../scss/home.module.scss";

const Welcome = () => {
  return (
    <Common>
      <div className={ Home.home }>
        <div className={ Home.home__box }>
          <h1 className={ Home.home__title }>スケジュール管理をはじめよう</h1>
          <div className={ Home.home__group }>
            <a href="/register" className={ Home.home__group__button }>会員登録</a>
            <a href="/login" className={ Home.home__group__button }>ログイン</a>
          </div>
        </div>
      </div>
    </Common>
  );
};

export default Welcome;
