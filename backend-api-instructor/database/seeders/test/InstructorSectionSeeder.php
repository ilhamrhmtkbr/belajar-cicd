<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorSection;
use Illuminate\Database\Seeder;

class InstructorSectionSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(InstructorCourseSeeder::class);

        $sections = new InstructorSection();
        $sections->id = 1;
        $sections->instructor_course_id = Conf::COURSE_ID;
        $sections->title = 'Section 1';
        $sections->order_in_course = 1;
        $sections->save();

        $sections = new InstructorSection();
        $sections->id = 2;
        $sections->instructor_course_id = Conf::COURSE_ID;
        $sections->title = 'Section 2';
        $sections->order_in_course = 2;
        $sections->save();
    }
}
