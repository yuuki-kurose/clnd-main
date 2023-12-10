<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{

    /**
     * IDを自動増分しない
     * 
     * @var bool
     */
    public $incrementing = false;
  
    /**
     * 複数代入可能にする
     * 
     * @var array
     */
    protected $fillable = [
      'date',
      'requirement',
      'memo',
    ];

    // $fillableの属性にデータ型を指定する
    protected $casts = [
      'date' => 'date',
      'requirement' => 'string',
      'memo' => 'string'
    ];
}
