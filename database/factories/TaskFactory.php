<?php

namespace Database\Factories;

use App\Models\Board;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['todo', 'in-progress', 'in-review', 'done'];
        $priorities = ['low', 'medium', 'high'];
        
        return [
            'board_id' => Board::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement($statuses),
            'priority' => fake()->randomElement($priorities),
            'due_date' => fake()->optional()->dateTimeBetween('now', '+30 days'),
            'started_at' => null,
            'completed_at' => null,
        ];
    }

    public function todo()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'todo',
        ]);
    }

    public function inProgress()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in-progress',
            'started_at' => now()->subDays(rand(1, 5)),
        ]);
    }

    public function done()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'done',
            'started_at' => now()->subDays(rand(5, 10)),
            'completed_at' => now()->subDays(rand(1, 4)),
        ]);
    }
}
