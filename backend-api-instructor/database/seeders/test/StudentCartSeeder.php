<?php

namespace Database\Seeders\test;

use Domain\StudentApiV1\Models\StudentCart;
use Illuminate\Database\Seeder;

class StudentCartSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([InstructorSeeder::class, InstructorCourseSeeder::class]);

        $studentCart = new StudentCart();
        $studentCart->id = 1;
        $studentCart->student_id = Conf::STUDENT_USERNAME;
        $studentCart->instructor_course_id = Conf::COURSE_ID;
        $studentCart->save();
    }
}
