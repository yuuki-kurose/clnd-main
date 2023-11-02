<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
  public function authenticate(Request $request) {
    $loginForm = $request->validate([
      'email' => ['required', 'email'],
      'password' => ['required'],
    ]);

    if(Auth::attempt($loginForm)) {
      // 成功の場合、セッションIDを新しく生成し、カレンダーページへ遷移
      $request->session()->regenerate();
      return redirect()->intended('/calender');
    }
    return back()->withErrors([
      'email' => 'メールアドレスが間違っています',
      'password' => 'パスワードが間違っています',
      'redirect' => '/login',
    ]);
  }
}