<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorCourseReview;
use Illuminate\Database\Seeder;

class StudentCourseReviewSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([InstructorSeeder::class, InstructorCourseSeeder::class]);

        $studentCourseReview = new InstructorCourseReview();
        $studentCourseReview->id = 1;
        $studentCourseReview->instructor_course_id = Conf::COURSE_ID;
        $studentCourseReview->student_id = Conf::STUDENT_USERNAME;
        $studentCourseReview->review = 'Review';
        $studentCourseReview->rating = 10;
        $studentCourseReview->save();
    }
}
