<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Board;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get all user's boards with task counts
        $boards = Board::where('user_id', $user->id)
            ->withCount(['tasks' => function ($query) {
                $query->where('status', 'done');
            }])
            ->withCount('tasks as total_tasks_count')
            ->get();
        
        // Calculate overall statistics
        $totalTasks = Task::whereIn('board_id', $boards->pluck('id'))->count();
        
        $completedThisWeek = Task::whereIn('board_id', $boards->pluck('id'))
            ->where('status', 'done')
            ->where('completed_at', '>=', Carbon::now()->startOfWeek())
            ->count();
        
        $overdueTasks = Task::whereIn('board_id', $boards->pluck('id'))
            ->whereNotIn('status', ['done'])
            ->whereNotNull('due_date')
            ->where('due_date', '<', Carbon::now())
            ->get();
        
        $inProgressCount = Task::whereIn('board_id', $boards->pluck('id'))
            ->whereIn('status', ['in-progress', 'in-review'])
            ->count();
        
        // Get upcoming tasks (next 7 days)
        $upcomingTasks = Task::whereIn('board_id', $boards->pluck('id'))
            ->whereNotIn('status', ['done'])
            ->whereNotNull('due_date')
            ->where('due_date', '>=', Carbon::now())
            ->where('due_date', '<=', Carbon::now()->addDays(7))
            ->with(['board', 'tags'])
            ->orderBy('due_date', 'asc')
            ->limit(10)
            ->get();
        
        // Get recent activity across all boards
        $recentActivity = Activity::whereIn('task_id', function ($query) use ($boards) {
            $query->select('id')
                ->from('tasks')
                ->whereIn('board_id', $boards->pluck('id'));
        })
            ->with('task.board')
            ->latest()
            ->limit(15)
            ->get();
        
        return Inertia::render('Dashboard', [
            'boards' => $boards,
            'stats' => [
                'totalTasks' => $totalTasks,
                'completedThisWeek' => $completedThisWeek,
                'overdueTasks' => $overdueTasks->count(),
                'inProgress' => $inProgressCount,
            ],
            'upcomingTasks' => $upcomingTasks,
            'recentActivity' => $recentActivity,
            'overdueTasks' => $overdueTasks,
        ]);
    }
}
