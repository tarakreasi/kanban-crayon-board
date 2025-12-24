<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'priority', 'status', 'board_id', 'due_date', 'started_at', 'completed_at'];

    protected $casts = [
        'due_date' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function activities()
    {
        return $this->hasMany(Activity::class)->latest();
    }

    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'task_tag');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
}
