<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorCourseCoupon;

class InstructorCourseCouponSeeder extends \Illuminate\Database\Seeder
{
    public function run(): void
    {
        $this->call(InstructorCourseSeeder::class);

        $instructorCourseCoupon = new InstructorCourseCoupon();
        $instructorCourseCoupon->id = Conf::INSTRUCTOR_COURSE_COUPON_ID;
        $instructorCourseCoupon->instructor_course_id = Conf::COURSE_ID;
        $instructorCourseCoupon->discount = 25;
        $instructorCourseCoupon->max_redemptions = 1000;
        $instructorCourseCoupon->expiry_date = '2025-09-23';
        $instructorCourseCoupon->save();
    }
}
