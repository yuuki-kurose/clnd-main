<?php

use Illuminate\Support\Facades\Route;

/**
 * ユーザー側
 */
Route::inertia('/', 'Home');
Route::inertia('/register', 'Register');
Route::inertia('/login', 'Login');

/**
 * ログイン認証後、ページ遷移
 */
Route::middleware('auth:api')->group(function() {
  Route::inertia('/calender', 'Calender');
});

/**
 * 管理者側
 */
Route::inertia('/admin/register', 'admin/Register');
Route::inertia('/admin/login', 'admin/Login');
