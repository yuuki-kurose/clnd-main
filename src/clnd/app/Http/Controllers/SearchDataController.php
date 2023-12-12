<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;

class SearchDataController extends Controller
{
  public function searchUserData(Request $request)
  {
    /**
     * 認証トークンを使用し、該当ユーザーのデータを検索する
     * 
     * @param Request $request
     * @return Response
     */

    // リクエストヘッダーから、認証トークンを取得
    // $attemptToken = $request->bearerToken();

    // ユーザーを特定
    $applicableUser = $request->user();

    // 該当ユーザーIDを取得
    $applicableUserId = $applicableUser->id;

    // ユーザーIDから該当の投稿データを検索・取得
    $postData = Schedule::where('id', $applicableUserId)->get();

    if($postData) {
      return response()->json([
        'postData' => $postData,
        'message' => 'データを取得しました',
      ], 200);
    } else {
      return response()->json(['errors' => 'データが取得できませんでした']);
    }
  }
}