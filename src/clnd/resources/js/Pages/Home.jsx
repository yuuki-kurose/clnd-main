import Common from "../Layout/common";
import Home from "../css/home.module.css";

const Welcome = () => {
  return (
    <Common>
      <div className={Home.home}>
          <h1 className={Home.home__title}>スケジュール管理をはじめよう</h1>
          <div className={Home.home__group}>
              <button className={Home.home__group__button}>会員登録</button>
              <button className={Home.home__group__button}>ログイン</button>
          </div>
      </div>
    </Common>
  );
};

export default Welcome;