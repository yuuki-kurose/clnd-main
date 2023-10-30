<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller {
  public function adminRegister(Request $request) {
    $formData = $request->validate([
      'name' => 'required | string | max:255',
      'email' => 'required| string | email | unique:users',
      'password' => 'required | string | min: 8',
    ]);

    $Admin = Admin::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    return response()->json(['message' => '管理者登録が完了しました', 'admin' => $Admin]);
  }
}