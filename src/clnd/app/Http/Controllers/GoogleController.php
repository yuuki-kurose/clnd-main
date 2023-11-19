<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller 
{
  /**
    * Googleの認証ページヘユーザーをリダイレクト
    *
    * @return \Illuminate\Http\Response
    */
  public function redirectToProvider()
  {
    return Socialite::driver('google')->redirect();
  }

  public function googleCallback()
  {
    // 取得だけでいいのでuser()を使用し、変数に代入する
    $googleUser = Socialite::driver('google')->user();
    dd($googleUser);
  }
}
