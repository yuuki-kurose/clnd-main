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
      // $request->session()->regenerate();
      return response()->json([
        'message' => '認証成功',
        'redirectTo' => '/calender',
      ], 200);
    }
    // return back('/login')->withErrors([
    //   'email' => 'メールアドレスが間違っています',
    //   'password' => 'パスワードが間違っています'
    // ]);
    return response()->json(['message' => '認証失敗'], 401);
  }
}