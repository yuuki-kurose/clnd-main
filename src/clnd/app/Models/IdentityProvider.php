<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IdentityProvider extends Model
{
  // 主キー
  protected $primaryKey = ['provider_name', 'provider_user_id'];
  // 自動増分動作無効
  public $incrementing = false;

  protected $fillable = ['provider_name', 'provider_user_id'];

  // userモデルとのリレーション
  public function user()
  {
    return $this->belongsTo('App/User', 'user_id', 'user_id');
  }
}