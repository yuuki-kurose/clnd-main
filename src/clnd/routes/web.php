<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;
use Laravel\Socialite\Facades\Socialite;

/**
 * ユーザー側
 */
Route::inertia('/', 'Home');
Route::inertia('/register', 'Register');
Route::inertia('/login', 'Login');

/**
 * task: 認証成功した後のルートを作成する
 */
Route::inertia('/calender', 'Calender');

// Googleコントローラーへアクセスするためのエンドポイント
Route::get('/google', [GoogleController::class, 'redirectToProvider']);
Route::get('/google/callback', [GoogleController::class, 'googleCallback']);

/**
 * 管理者側
 */
Route::inertia('/admin/register', 'admin/Register');
Route::inertia('/admin/login', 'admin/Login');
