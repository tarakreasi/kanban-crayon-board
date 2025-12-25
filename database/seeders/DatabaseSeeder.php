<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $users = [
            [
                'name' => 'ajarsinau',
                'email' => 'ajarsinau@gmail.com',
            ],
            [
                'name' => 'twantoro07',
                'email' => 'twantoro07@gmail.com',
            ],
            [
                'name' => 'taratask',
                'email' => 'taratask@tarakreasi.com',
            ]
        ];

        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => Hash::make('password')
                ]
            );
        }
    }
}
