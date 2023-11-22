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
      /**
       * task: validationルールを設定する
       */
      'date' => 'required',
      'requirement' => 'required',
      'memo' => '',
    ]);

    // エラーハンドリング
    if($scheduleForm === 'error') {
      return redirect('/schedule')
        ->withErrors($scheduleForm)
        ->withInput();
    }

    // validationチェック後、データベースに登録
    $newScheduleForm = Schedule::create([
      'date' => $request->input('date'),
      'requirement' => $request->input('requirement'),
      'memo' => $request->input('memo'),
    ]);

    // 登録されたデータから日付を取得
    $selectedDate = $newScheduleForm['date'];

    // 指定された日付に紐づくデータを取得
    $formFilterData = Schedule::whereDate('date', $selectedDate)->get();

    return response()->json([
      'message' => 'スケジュールが登録されました',
      'selectedDate' => $selectedDate,
      'formFilterData' => $formFilterData,
    ], 200);
  } 
}