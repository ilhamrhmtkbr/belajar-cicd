<?php

namespace App\Models;

use Carbon\Carbon;
use MongoDB\Laravel\Eloquent\Model;

class Forum extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'forums';
    protected $fillable = [
        'username', 'name', 'message', 'role', 'created_at', 'course_id'
    ];

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
