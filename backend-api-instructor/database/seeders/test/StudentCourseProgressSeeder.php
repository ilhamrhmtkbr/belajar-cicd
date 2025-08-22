<?php

namespace Database\Seeders\test;

use Domain\StudentApiV1\Models\StudentCourseProgress;
use Illuminate\Database\Seeder;

class StudentCourseProgressSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([InstructorSeeder::class, InstructorSectionSeeder::class]);

        $studentCourseProgressSeeder = new StudentCourseProgress();
        $studentCourseProgressSeeder->student_id = Conf::STUDENT_USERNAME;
        $studentCourseProgressSeeder->instructor_section_id = 1;
        $studentCourseProgressSeeder->save();

        $studentCourseProgressSeeder = new StudentCourseProgress();
        $studentCourseProgressSeeder->student_id = Conf::STUDENT_USERNAME;
        $studentCourseProgressSeeder->instructor_section_id = 2;
        $studentCourseProgressSeeder->save();
    }
}
