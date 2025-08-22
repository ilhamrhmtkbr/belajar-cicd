<?php

namespace Database\Seeders\test;

use Domain\AuthApiV1\Models\User;
use Domain\MemberApiV1\Enum\UserRole;
use Domain\StudentApiV1\Enum\StudentCategory;
use Domain\StudentApiV1\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->full_name = Conf::STUDENT_FULL_NAME;
        $user->username = Conf::STUDENT_USERNAME;
        $user->password = Hash::make(Conf::STUDENT_PASSWORD);
        $user->role = UserRole::STUDENT->value;
        $user->email = Conf::STUDENT_EMAIL;
        $user->email_verified_at = now();
        $user->save();

        $student = new Student();
        $student->user_id = $user->username;
        $student->category = StudentCategory::EMPLOYEE;
        $student->summary = 'summary';
        $student->save();
    }
}
