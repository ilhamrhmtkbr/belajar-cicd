<?php

namespace Database\Seeders\test;

use Domain\AuthApiV1\Models\User;
use Domain\InstructorApiV1\Models\Instructor;
use Domain\MemberApiV1\Enum\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        $user = new User();
        $user->full_name = Conf::INSTRUCTOR_FULL_NAME;
        $user->username = Conf::INSTRUCTOR_USERNAME;
        $user->password = Hash::make(Conf::INSTRUCTOR_PASSWORD);
        $user->role = UserRole::INSTRUCTOR->value;
        $user->email = Conf::INSTRUCTOR_EMAIL;
        $user->email_verified_at = now();
        $user->save();

        $instructor = new Instructor();
        $instructor->user_id = $user->username;
        $instructor->resume = 'resume';
        $instructor->summary = 'summary';
        $instructor->save();
    }
}
