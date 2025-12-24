<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Ensure user has at least one board
        if ($user->boards()->count() === 0) {
            $user->boards()->create([
                'title' => 'Personal',
                'theme_color' => '#4A90E2'
            ]);
        }

        $activeBoard = null;
        if ($request->has('board_id')) {
            $activeBoard = $user->boards()->find($request->board_id);
        }

        // Fallback to first board if specific one not found or not provided
        if (!$activeBoard) {
            $activeBoard = $user->boards()->first();
        }

        $tasks = $activeBoard ? $activeBoard->tasks()->with('tags')->orderBy('created_at', 'desc')->get() : [];

        return Inertia::render('Kanban', [
            'tasks' => $tasks,
            'boards' => $user->boards,
            'activeBoard' => $activeBoard,
            'tags' => $activeBoard ? $activeBoard->tags : []
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:todo,in-progress,in-review,done',
            'board_id' => 'nullable|exists:boards,id',
            'due_date' => 'nullable|date',
        ]);

        // If board_id not provided, use user's first board
        if (empty($validated['board_id'])) {
            $board = $request->user()->boards()->first();
            if (!$board) {
                $board = $request->user()->boards()->create([
                    'title' => 'Personal',
                    'theme_color' => '#4A90E2'
                ]);
            }
            $validated['board_id'] = $board->id;
        } else {
            // Verify board ownership
            $board = \App\Models\Board::find($validated['board_id']);
            if ($board->user_id !== $request->user()->id) {
                abort(403);
            }
        }

        $task = $board->tasks()->create($validated);

        $task->activities()->create([
            'type' => 'created',
            'description' => 'Task created',
            'properties' => $validated
        ]);

        if ($request->wantsJson()) {
            return response()->json($task, 201);
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'sometimes|in:low,medium,high',
            'status' => 'sometimes|in:todo,in-progress,in-review,done',
            'due_date' => 'nullable|date',
        ]);

        $oldStatus = $task->status;
        $task->fill($validated);
        
        $changes = $task->getDirty();
        $task->save();

        if (isset($validated['status']) && $oldStatus !== $validated['status']) {
            $task->activities()->create([
                'type' => 'moved',
                'description' => "Moved from {$oldStatus} to {$validated['status']}",
                'properties' => ['from' => $oldStatus, 'to' => $validated['status']]
            ]);

            // Cycle Time Logic
            if ($validated['status'] === 'in-progress' && !$task->started_at) {
                $task->started_at = now();
                $task->save();
            }
            if ($validated['status'] === 'done' && !$task->completed_at) {
                $task->completed_at = now();
                $task->save();
            }
        } elseif (!empty($changes)) {
            $description = 'Task updated';
            
            if (isset($changes['title'])) {
                $description = 'Updated title';
            } elseif (isset($changes['priority'])) {
                $description = "Changed priority to {$changes['priority']}";
            } elseif (isset($changes['description'])) {
                $description = 'Updated description';
            }

            $task->activities()->create([
                'type' => 'updated',
                'description' => $description,
                'properties' => $changes
            ]);
        }

        if ($request->wantsJson()) {
            return response()->json($task);
        }

        return redirect()->back();
    }

    public function activities(Task $task)
    {
        return response()->json($task->activities()->latest()->get());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Task $task)
    {
        // We can't log activity on a deleted task if using cascade delete, 
        // but for now let's assume we might want to log it elsewhere or soft delete.
        // Since we did cascadeOnDelete, the activity will be gone. 
        // We'll just delete for now.
        $task->delete();
        if ($request->wantsJson()) {
            return response()->noContent();
        }

        return redirect()->back();
    }
}
