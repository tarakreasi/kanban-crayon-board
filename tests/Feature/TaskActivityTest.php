<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Board;
use App\Models\Task;
use App\Models\Activity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskActivityTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_logs_activity_when_task_is_created()
    {
        $user = User::factory()->create();
        $board = Board::factory()->create(['user_id' => $user->id]);
        
        $payload = [
            'title' => 'New Task',
            'description' => 'Description',
            'status' => 'todo',
            'priority' => 'medium',
            'board_id' => $board->id,
        ];

        $response = $this->actingAs($user)->postJson(route('tasks.store'), $payload);

        $response->assertStatus(201);
        
        $task = Task::first();
        $this->assertNotNull($task);

        $this->assertDatabaseHas('activities', [
            'task_id' => $task->id,
            'type' => 'created',
            'description' => 'Task created'
        ]);
    }

    public function test_it_logs_activity_when_task_is_updated()
    {
        $user = User::factory()->create();
        $board = Board::factory()->create(['user_id' => $user->id]);
        
        $task = Task::factory()->create([
            'board_id' => $board->id,
            'title' => 'Original Title',
            'status' => 'todo',
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($user)->putJson(route('tasks.update', $task), [
            'title' => 'Updated Title'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'task_id' => $task->id,
            'type' => 'updated',
        ]);
        
        $activity = Activity::where('task_id', $task->id)->where('type', 'updated')->first();
        $this->assertStringContainsString('title', $activity->description);
    }

    public function test_it_logs_activity_when_task_status_is_changed()
    {
        $user = User::factory()->create();
        $board = Board::factory()->create(['user_id' => $user->id]);
        
        $task = Task::factory()->create([
            'board_id' => $board->id,
            'title' => 'Moving Task',
            'status' => 'todo',
            'priority' => 'medium'
        ]);

        $response = $this->actingAs($user)->putJson(route('tasks.update', $task), [
            'status' => 'in-progress'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'task_id' => $task->id,
            'type' => 'moved',
            'description' => 'Moved from todo to in-progress'
        ]);
    }

    public function test_it_can_fetch_activities_for_task()
    {
        $user = User::factory()->create();
        $board = Board::factory()->create(['user_id' => $user->id]);
        
        $task = Task::factory()->create([
            'board_id' => $board->id,
            'title' => 'Active Task',
            'status' => 'todo',
            'priority' => 'medium'
        ]);

        $task->activities()->create([
            'type' => 'custom_log',
            'description' => 'Something happened'
        ]);

        $response = $this->actingAs($user)->getJson(route('tasks.activities', $task));

        $response->assertStatus(200)
            ->assertJsonCount(1);
            
        $response->assertJsonFragment([
            'type' => 'custom_log',
            'description' => 'Something happened'
        ]);
    }
}
