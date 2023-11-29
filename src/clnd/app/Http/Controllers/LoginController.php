<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
  public function authenticate(Request $request) {

    // リクエストデータの検証
    $loginUser = $request->validate([
      'email' => ['required', 'email'],
      'password' => 'required',
    ]);

    // 検証後のデータを認証
    if(Auth::attempt($loginUser)) {
      // ユーザー情報を取得
      $user = Auth::user();
      return response()->json([
        'userId' => $user->id,
        'message' => '認証成功',
        'redirectTo' => '/calender',
      ], 200);
    } else if(!Auth::attempt(['email' => $loginUser['email']])) {
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