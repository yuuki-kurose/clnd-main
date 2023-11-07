<?php

use Illuminate\Support\Facades\Route;

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
// 仮ルート
Route::inertia('/schedule', 'Schedule');

/**
 * 管理者側
 */
Route::inertia('/admin/register', 'admin/Register');
Route::inertia('/admin/login', 'admin/Login');
