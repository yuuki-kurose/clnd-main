<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\GoogleController;
// use Laravel\Socialite\Facades\Socialite;

/**
 * ユーザー側
 */
Route::inertia('/', 'Home');
Route::inertia('/register', 'Register');
Route::inertia('/login', 'Login');
Route::inertia('/calender', 'Calender');
Route::inertia('/search', 'Search');

/**
 * 管理者側
 */
Route::inertia('/admin/register', 'admin/Register');
Route::inertia('/admin/login', 'admin/Login');
