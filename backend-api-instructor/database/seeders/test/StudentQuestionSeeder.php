<?php

namespace Database\Seeders\test;

use Domain\StudentApiV1\Models\StudentQuestion;
use Illuminate\Database\Seeder;

class StudentQuestionSeeder extends Seeder
{
    public function run(): void
    {
        $studentQuestion = new StudentQuestion();
        $studentQuestion->id = 1;
        $studentQuestion->student_id = Conf::STUDENT_USERNAME;
        $studentQuestion->instructor_course_id = Conf::COURSE_ID;
        $studentQuestion->question = 'question';
        $studentQuestion->save();
    }
}
