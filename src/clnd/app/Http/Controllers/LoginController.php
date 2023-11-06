<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
  public function authenticate(Request $request) {

    $email = $request->input('email');
    $password = $request->input('password');

    if(Auth::attempt(['email' => $email, 'password' => $password])) {
      return response()->json([
        'message' => '認証成功',
        'redirectTo' => '/calender',
      ], 200);
    } else if(!Auth::attempt(['email' => $email])) {
      $errors = ['email' => 'メールアドレスが間違っています'];
      return response()->json([
        'message' => '認証失敗',
        'redirectTo' => '/login',
        'errors' => $errors,
      ], 422);
    } else {
      /**
       * task: パスワードのエラーハンドリング見直し
       */
      $errors = ['password' => 'パスワードが間違っています'];
      return response()->json([
        'message' => '認証失敗',
        'redirectTo' => '/login',
        'errors' => $errors,
      ], 422);
    }
  }
}