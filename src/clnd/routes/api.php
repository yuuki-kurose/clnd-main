<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminRegisterController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\Auth\GoogleController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// react側からフォーム送信で使用するエンドポイント
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/AdminRegister', [AdminRegisterController::class, 'adminRegister']);
Route::post('/AdminLogin', [AdminLoginController::class, 'authenticate']);

// googleログイン使用のみ、CSRFの確認を不要にする
Route::middleware(['web'])->group(function () {
  Route::post('/auth/google', [GoogleController::class, 'redirectToGoogle'])
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);
  // Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});