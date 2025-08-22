<?php

namespace Database\Seeders\test;

use Domain\StudentApiV1\Models\StudentTransaction;
use Illuminate\Database\Seeder;

class StudentTransactionSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(InstructorCourseCouponSeeder::class);

        $studentTransaction = new StudentTransaction();
        $studentTransaction->order_id = Conf::STUDENT_TRANSACTION_ORDER_ID;
        $studentTransaction->student_id = Conf::STUDENT_TRANSACTION_USER_ID;
        $studentTransaction->instructor_course_id = Conf::STUDENT_TRANSACTION_INSTRUCTOR_COURSE_ID;
        $studentTransaction->instructor_course_coupon_id = Conf::STUDENT_TRANSACTION_INSTRUCTOR_COURSE_COUPON_ID;
        $studentTransaction->amount = Conf::STUDENT_TRANSACTION_AMOUNT;
        $studentTransaction->midtrans_data = Conf::STUDENT_TRANSACTION_MIDTRANS_DATA;
        $studentTransaction->status = Conf::STUDENT_TRANSACTION_STATUS;
        $studentTransaction->save();
    }
}
