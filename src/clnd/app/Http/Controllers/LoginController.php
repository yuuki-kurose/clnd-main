<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
  public function authenticate(Request $request)
  {
    // リクエストデータの検証
    $loginUser = $request->validate([
      'email' => ['required', 'email'],
      'password' => 'required',
    ]);

    // 検証後のデータを認証
    if(Auth::attempt($loginUser)) {
      $token = $request->user()->createToken($request->token_name ?? 'null');
      // dd($token);
      return response()->json([
        'token' => $token->plainTextToken,
        'message' => '認証成功',
        'redirectTo' => '/search',
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