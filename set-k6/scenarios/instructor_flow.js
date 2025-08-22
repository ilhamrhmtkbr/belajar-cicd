import { register } from '../helpers/auth.js';

// Define data instructor langsung di dalam file (karena K6 kadang bermasalah dengan JSON import)
const instructorData = [
    {
        "first_name": "Ilham",
        "middle_name": "Rahmat",
        "last_name": "Akbar",
        "username": "ilhamrhmtkbr",
        "password": "Ilham123!",
        "password_confirmation": "Ilham123!"
    },
    {
        "first_name": "Sari",
        "middle_name": "Dewi",
        "last_name": "Pertiwi",
        "username": "saridwprtwi",
        "password": "Sari456@",
        "password_confirmation": "Sari456@"
    },
    {
        "first_name": "Budi",
        "middle_name": "Santoso",
        "last_name": "Wijaya",
        "username": "budisntswjy",
        "password": "Budi789#",
        "password_confirmation": "Budi789#"
    },
    {
        "first_name": "Rina",
        "middle_name": "Sari",
        "last_name": "Lestari",
        "username": "rinasrlstr",
        "password": "Rina321$",
        "password_confirmation": "Rina321$"
    }
];

export function instructorRegistrationFlow() {
    // Debug: cek apakah data ada
    console.log(`Total instructors: ${instructorData.length}`);

    // Ambil data instructor secara random
    const randomIndex = Math.floor(Math.random() * instructorData.length);
    const instructor = instructorData[randomIndex];

    // Debug: cek instructor data
    console.log(`Selected index: ${randomIndex}, instructor: ${JSON.stringify(instructor)}`);

    if (!instructor) {
        console.error('Instructor data is undefined!');
        return;
    }

    console.log(`Registering instructor: ${instructor.username}`);

    // Panggil fungsi register
    register(
        instructor.first_name,
        instructor.middle_name,
        instructor.last_name,
        instructor.username,
        instructor.password,
        instructor.password_confirmation
    );
}