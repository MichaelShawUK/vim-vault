<?php

namespace Database\Factories;

use App\Models\Plugin;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comment' => fake()->paragraph(),
            'plugin_id' => fake()->randomElement(Plugin::query()->pluck('id')->toArray()),
            'user_id' => fake()->randomElement(User::query()->pluck('id')->toArray()),
        ];
    }
}
