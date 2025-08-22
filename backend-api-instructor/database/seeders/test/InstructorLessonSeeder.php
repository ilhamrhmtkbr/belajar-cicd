<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorLesson;
use Illuminate\Database\Seeder;

class InstructorLessonSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(InstructorSectionSeeder::class);

        $instructorLesson = new InstructorLesson();
        $instructorLesson->id = 1;
        $instructorLesson->instructor_section_id = 1;
        $instructorLesson->title = 'Lesson 1';
        $instructorLesson->description = 'Lesson desc 1';
        $instructorLesson->code = base64_encode('Lesson code 1');
        $instructorLesson->order_in_section = 1;
        $instructorLesson->save();

        $instructorLesson = new InstructorLesson();
        $instructorLesson->id = 2;
        $instructorLesson->instructor_section_id = 1;
        $instructorLesson->title = 'Lesson 1';
        $instructorLesson->description = 'Lesson desc 1';
        $instructorLesson->code = base64_encode('Lesson code 1');
        $instructorLesson->order_in_section = 2;
        $instructorLesson->save();
    }
}
