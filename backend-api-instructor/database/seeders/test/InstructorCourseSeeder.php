<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorCourse;
use Illuminate\Database\Seeder;

class InstructorCourseSeeder extends Seeder
{
    public function run(): void
    {
        $course = new InstructorCourse();
        $course->id = Conf::COURSE_ID;
        $course->instructor_id = Conf::COURSE_INSTRUCTOR;
        $course->title = Conf::COURSE_TITLE;
        $course->description = Conf::COURSE_DESCRIPTION;
        $course->price = Conf::COURSE_PRICE;
        $course->image = Conf::COURSE_IMAGE;
        $course->level = Conf::COURSE_LEVEL;
        $course->status = Conf::COURSE_STATUS;
        $course->notes = Conf::COURSE_NOTES;
        $course->visibility = Conf::COURSE_VISIBILITY;
        $course->requirements = Conf::COURSE_REQUIREMENTS;
        $course->editor = Conf::COURSE_EDITOR;
        $course->save();
    }

}
