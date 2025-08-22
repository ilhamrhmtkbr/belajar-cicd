<?php

namespace Database\Seeders\test;

use Domain\AuthApiV1\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->username = Conf::STUDENT_USERNAME;
        $user->password = Hash::make(Conf::STUDENT_PASSWORD);
        $user->full_name = Conf::STUDENT_FULL_NAME;
        $user->save();
    }
}
