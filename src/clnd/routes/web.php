<?php

use Illuminate\Support\Facades\Route;

/**
 * ユーザー側
 */
Route::inertia('/', 'Home');
Route::inertia('/register', 'Register');
Route::inertia('/login', 'Login');
Route::inertia('/calender', 'Calender');

/**
 * 管理者側
 */
Route::inertia('/admin/register', 'admin/Register');
Route::inertia('/admin/login', 'admin/Login');
