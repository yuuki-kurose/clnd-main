<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AdminRegisterController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\ScheduleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// react側からフォーム送信で使用するエンドポイント
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/schedule', [ScheduleController::class, 'posting']);


Route::post('/AdminRegister', [AdminRegisterController::class, 'adminRegister']);
Route::post('/AdminLogin', [AdminLoginController::class, 'authenticate']);
