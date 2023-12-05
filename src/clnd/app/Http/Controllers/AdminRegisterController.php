<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class AdminRegisterController extends Controller {
  public function adminRegister(Request $request)
  {
    $formData = $request->validate([
      'name' => 'required | string | max:255',
      'email' => 'required| string | email | unique:admins',
      'password' => 'required | string | min: 8',
    ]);

    $admin = Admin::create([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    return response()->json(['message' => '管理者登録が完了しました', 'admin' => $admin]);
  }
}