<?php

namespace Database\Seeders;

use Domain\Shared\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeederTest extends Seeder
{
    public const STUDENT_USERNAME = 'ilham';
    public const STUDENT_FULL_NAME = 'Ilham Rahmat Akbar';
    public const STUDENT_PASSWORD = 'Ilham99!';

    public function run(): void
    {
        $user = new User();
        $user->username = self::STUDENT_USERNAME;
        $user->password = Hash::make(self::STUDENT_PASSWORD);
        $user->full_name = self::STUDENT_FULL_NAME;
        $user->save();
    }
}
