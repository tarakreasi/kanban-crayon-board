<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = ['task_id', 'type', 'description', 'properties'];

    protected $casts = [
        'properties' => 'array',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
