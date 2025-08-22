<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorAnswer;
use Illuminate\Database\Seeder;

class InstructorAnswerSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(StudentSeeder::class);
        $this->call(InstructorCourseSeeder::class);
        $this->call(StudentQuestionSeeder::class);

        $instructorAnswer = new InstructorAnswer();
        $instructorAnswer->id = 1;
        $instructorAnswer->instructor_id = Conf::INSTRUCTOR_USERNAME;
        $instructorAnswer->student_question_id = 1;
        $instructorAnswer->answer = 'answer';
        $instructorAnswer->save();
    }
}
