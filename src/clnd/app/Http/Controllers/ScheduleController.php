<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScheduleController extends Controller {
  public function posting(Request $request)
  {
    $requestForm = $request->all();
    dd($requestForm);
  }
}