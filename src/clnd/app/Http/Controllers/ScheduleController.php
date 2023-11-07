<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller {
  public function store(Request $request)
  {
    /**
     * 検証後、データベースにフォームデータを登録
     * 
     * @param Request $request
     * @return Response
     */
    $scheduleForm = (object)$request->validateWithBag('post', [
      'date' => 'required',
      'requirement' => 'required | min: 4',
      'memo' => 'min: 4',
    ]);

    //検証エラーハンドリング
    if($scheduleForm === 'error') {
      return redirect('/schedule')
        ->withErrors($scheduleForm)
        ->withInput();
    }

    // ユーザー入力情報を取得し、データベースに登録
    $scheduleForm = Schedule::create([
      'date' => $request->input('date'),
      'requirement' => $request->input('requirement'),
      'memo' => $request->input('memo'),
    ]);
    // dd($scheduleForm);

    return response()->json([
      'message' => '確認しました',
      'validate' => $scheduleForm,
    ], 200);
  }
}