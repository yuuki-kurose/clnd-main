<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller {
  public function register(Request $request) {
    $formData = $request->validate([
      'name' => 'required | string | max:255',
      'email' => 'required| string | email | unique:users',
      'password' => 'required | string | min: 8',
    ]);
    //dd($formData);

    $user = User::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);
    //dd($user);
    return response()->json(['message' => 'ユーザー登録が完了しました', 'user' => $user]);
  }
}
