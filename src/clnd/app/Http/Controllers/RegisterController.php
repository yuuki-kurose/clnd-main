<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller {
  public function register(Request $request)
  {

    // リクエストデータのバリデーション検証
    $formData = $request->validate([
      'name' => 'required | string | max:255',
      'email' => 'required| string | email | unique:users',
      'password' => 'required | string | min: 8',
    ]);
    //dd($formData);

    // 検証後、Userモデルに登録
    $user = User::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    // データベースに登録された変数を、リレーションに結びつける
    if($user) {
      $scheduleData = $user->user();
      dd($scheduleData);
      return response()->json([
        'message' => 'ユーザー登録が完了しました',
        'scheduleData' => $scheduleData,
        'user' => $user,
        'redirect' => '/',
      ]);
    } else {
      return response()->json(['message' => '該当データが見つかりません']);
    }
  }
}
