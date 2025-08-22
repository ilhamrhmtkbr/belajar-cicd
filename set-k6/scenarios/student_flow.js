import { group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { register, login } from '../helpers/auth.js';
import { getCourses, enrollCourse, viewCourseContent } from '../helpers/public.js';

const users = new SharedArray('users', function () {
    return JSON.parse(open('../data/student.json'));
});

export function studentFlow() {
    let token;
    const user = users[(__VU - 1) % users.length];

    group('User Authentication', function () {
        register(user.first_name, user.middle_name, user.last_name, user.username, user.password, user.password_confirmation);
        sleep(1);

        // token = login(user.username, user.password);
        // sleep(2);
    });

    // if (!token) {
    //     console.error('Failed to get token, skipping course interactions.');
    //     return;
    // }

    // // 2. Melihat Daftar Kursus
    // group('Browse Courses', function () {
    //     const courses = getCourses(token);
    //     if (courses && courses.data && courses.data.length > 0) {
    //         // Pilih kursus pertama untuk di-enroll dan dilihat
    //         scenario.env.COURSE_ID = courses.data[0].id; // Simpan ID kursus untuk langkah selanjutnya
    //     } else {
    //         console.warn('No courses found to enroll or view.');
    //     }
    //     sleep(2);
    // });
    //
    // // Pastikan ada COURSE_ID sebelum melanjutkan
    // if (scenario.env.COURSE_ID) {
    //     // 3. Mendaftar Kursus (Enroll)
    //     group('Enroll Course', function () {
    //         enrollCourse(token, scenario.env.COURSE_ID);
    //         sleep(3);
    //     });
    //
    //     // 4. Mengakses Konten Kursus
    //     group('View Course Content', function () {
    //         viewCourseContent(token, scenario.env.COURSE_ID);
    //         sleep(3);
    //     });
    // } else {
    //     console.warn('Skipping Enroll and View Course Content as no COURSE_ID is available.');
    // }
}