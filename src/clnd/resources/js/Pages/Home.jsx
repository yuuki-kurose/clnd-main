//import { Inertia } from '@inertiajs/inertia-react';
import Layout from "../Layout/LayoutApp";

const Welcome = () => {
  return (
    <Layout>
      <div className="home">
        <h1 className="home_title">スケジュール管理をはじめよう</h1>
        <button className="home_button">会員登録</button>
        <button className="home_button">ログイン</button>
      </div>
    </Layout>
  );
};

export default Welcome;