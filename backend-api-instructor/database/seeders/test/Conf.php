<?php

namespace Database\Seeders\test;

use Domain\InstructorApiV1\Enum\InstructorCourseLevel;
use Domain\InstructorApiV1\Enum\InstructorCourseStatus;
use Domain\InstructorApiV1\Enum\InstructorCourseVisibility;
use Domain\StudentApiV1\Enum\StudentTransactionStatus;

class Conf
{
    public const INSTRUCTOR_USERNAME = 'ilhamrhmtkbr';
    public const INSTRUCTOR_FULL_NAME = 'Ilham Rahmat Akbar';
    public const INSTRUCTOR_PASSWORD = 'Ilham25!';
    public const INSTRUCTOR_EMAIL = 'ilham@gmail.com';

    public const STUDENT_USERNAME = 'student';
    public const STUDENT_FULL_NAME = 'Student';
    public const STUDENT_PASSWORD = 'Ilham25!';
    public const STUDENT_EMAIL = 'student@gmail.com';

    public const COURSE_ID = '9cb92dfe-f001-4a31-9f1d-d989cef38515';
    public const COURSE_INSTRUCTOR = self::INSTRUCTOR_USERNAME;
    public const COURSE_TITLE = 'COURSE_TITLE';
    public const COURSE_DESCRIPTION = 'COURSE_DESCRIPTION';
    public const COURSE_PRICE = 15000;
    public const COURSE_IMAGE = 'COURSE_IMAGE';
    public const COURSE_LEVEL = InstructorCourseLevel::JUNIOR->value;
    public const COURSE_STATUS = InstructorCourseStatus::PAID->value;
    public const COURSE_VISIBILITY = InstructorCourseVisibility::PUBLIC->value;
    public const COURSE_NOTES = 'COURSE_NOTES';
    public const COURSE_REQUIREMENTS = 'COURSE_REQUIREMENTS';
    public const COURSE_EDITOR = 'php';

    public const INSTRUCTOR_COURSE_COUPON_ID = '8sda92dfe-f001-4a31-9f1d-d989cef38';

    public const INSTRUCTOR_ACCOUNT_ID = '123321123';
    public const INSTRUCTOR_ACCOUNT_BANK = 'agris';
    public const INSTRUCTOR_ACCOUNT_ALIAS_NAME = 'ilhamAlias123';

    public const STUDENT_CERTIFICATE_ID = '8sdAbcDef-f001-4a31-9f1d-d989cef38';

    public const STUDENT_TRANSACTION_ORDER_ID = '67bd73b635bc5';
    public const STUDENT_TRANSACTION_USER_ID = self::STUDENT_USERNAME;
    public const STUDENT_TRANSACTION_INSTRUCTOR_COURSE_ID = self::COURSE_ID;
    public const STUDENT_TRANSACTION_INSTRUCTOR_COURSE_COUPON_ID = self::INSTRUCTOR_COURSE_COUPON_ID;
    public const STUDENT_TRANSACTION_AMOUNT = self::COURSE_PRICE;
    public const STUDENT_TRANSACTION_MIDTRANS_DATA = '{"transaction": "value"}';
    public const STUDENT_TRANSACTION_STATUS = StudentTransactionStatus::SETTLEMENT->value;
}
