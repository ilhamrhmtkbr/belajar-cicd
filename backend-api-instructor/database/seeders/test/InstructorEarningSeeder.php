<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Models\InstructorEarning;
use Illuminate\Database\Seeder;

class InstructorEarningSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(StudentTransactionSeeder::class, StudentSeeder::class);

        $instructorEarningSeeder = new InstructorEarning();
        $instructorEarningSeeder->order_id = Conf::STUDENT_TRANSACTION_ORDER_ID;
        $instructorEarningSeeder->instructor_course_id = Conf::STUDENT_TRANSACTION_INSTRUCTOR_COURSE_ID;
        $instructorEarningSeeder->student_id = Conf::STUDENT_TRANSACTION_USER_ID;
        $instructorEarningSeeder->amount = Conf::STUDENT_TRANSACTION_AMOUNT;
        $instructorEarningSeeder->status = Conf::STUDENT_TRANSACTION_STATUS;
        $instructorEarningSeeder->save();
    }
}
