<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [TaskController::class, 'index'])->middleware(['auth', 'verified'])->name('home');



Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // My Tasks
    Route::get('/my-tasks', [\App\Http\Controllers\MyTasksController::class, 'index'])->name('my-tasks');
    
    // Kanban
    Route::get('/kanban', [TaskController::class, 'index'])->name('kanban.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::get('/tasks/{task}/activities', [TaskController::class, 'activities'])->name('tasks.activities');

    // Board routes
    Route::get('/boards/{board}/settings', [\App\Http\Controllers\BoardController::class, 'settings'])->name('boards.settings');
    Route::post('/boards/{board}/settings', [\App\Http\Controllers\BoardController::class, 'updateSettings'])->name('boards.updateSettings');
    Route::post('/boards', [\App\Http\Controllers\BoardController::class, 'store'])->name('boards.store');
    Route::put('/boards/{board}', [\App\Http\Controllers\BoardController::class, 'update'])->name('boards.update');
    Route::delete('/boards/{board}', [\App\Http\Controllers\BoardController::class, 'destroy'])->name('boards.destroy');

    // Tag routes
    Route::post('/tags', [\App\Http\Controllers\TagController::class, 'store'])->name('tags.store');
    Route::delete('/tags/{tag}', [\App\Http\Controllers\TagController::class, 'destroy'])->name('tags.destroy');

    // Comment routes
    Route::get('/tasks/{task}/comments', [\App\Http\Controllers\CommentController::class, 'index'])->name('comments.index');
    Route::post('/tasks/{task}/comments', [\App\Http\Controllers\CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [\App\Http\Controllers\CommentController::class, 'destroy'])->name('comments.destroy');

    // Analytics
    Route::get('/analytics', [\App\Http\Controllers\AnalyticsController::class, 'index'])->name('analytics.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
