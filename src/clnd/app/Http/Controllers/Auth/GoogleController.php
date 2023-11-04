<?php

namespace App\Http\Controllers\Auth;

use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GoogleController extends Controller {
  public function redirectToGoogle(Request $request)
  {
    // $url = 'https://accounts.google.com/o/oauth2/auth?' . http_build_query([
    //   'client_id' => '954099411137-6lvuuro4j408d2d74tm2cfqsae3apude.apps.googleusercontent.com',
    //   'redirect_uri' => 'http://localhost/auth/google/callback',
    //   'scope' => 'openid profile email',
    //   'response_type' => 'code',
    //   'state' => '',
    // ]);
  }
  
  // public function handleGoogleCallback()
  // {
  //     // $user = Socialite::driver('google')->user();
  
  //     // return redirect('/login');
  //     // return response()->json(['message' => 'Googleでログイン成功']);
  // }
}