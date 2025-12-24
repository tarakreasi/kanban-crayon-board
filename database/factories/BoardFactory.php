<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Board>
 */
class BoardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->words(2, true),
            'theme_color' => '#' . str_pad(dechex(fake()->numberBetween(0, 16777215)), 6, '0', STR_PAD_LEFT),
            'wip_limits' => json_encode([
                'todo' => null,
                'in-progress' => 5,
                'in-review' => 3,
                'done' => null,
            ]),
        ];
    }
}
