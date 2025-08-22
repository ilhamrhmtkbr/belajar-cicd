<?php

namespace Database\Seeders\test;

use Domain\StudentApiV1\Models\StudentCertificate;
use Illuminate\Database\Seeder;

class StudentCertificateSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([InstructorSeeder::class, InstructorCourseSeeder::class]);

        $studentCertificate = new StudentCertificate();
        $studentCertificate->id = Conf::STUDENT_CERTIFICATE_ID;
        $studentCertificate->student_id = Conf::STUDENT_USERNAME;
        $studentCertificate->instructor_course_id = Conf::COURSE_ID;
        $studentCertificate->save();
    }
}
