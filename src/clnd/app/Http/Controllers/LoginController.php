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
      $request->session()->regenerate();
      /**
       * task: リダイレクト先の変更
       */
      return redirect()->intended('/');
    }
    return back('/login')->withErrors([
      'email' => 'メールアドレスが間違っています',
      'password' => 'パスワードが間違っています'
    ]);
  }
}