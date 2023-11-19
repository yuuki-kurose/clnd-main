<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Google_oauth extends Model
{
  /**
   * 複数代入可能にする
   * 
   * @var array
   */
  protected $fillable = [
    'id',
    'name',
    'password',
  ];
}
