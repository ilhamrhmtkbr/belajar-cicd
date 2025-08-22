export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<2000', 'p(99)<5000'], // artinya semua request harus 95 persen berhasil selama 2 detik, dan 99 persen harus berhasil selama 5 detik
        'http_req_failed': ['rate<0.05'], // toleransi request boleh gagal 5 persen
        'http_reqs': ['rate>5'], // Jumlah rata-rata request yang dikirim harus lebih dari 5 request per detik (RPS)
        'checks': ['rate>0.90'], // Setidaknya 90% dari semua check() minimal 90% check harus lolos harus berhasil (true)

        // Scenario-specific thresholds
        // k6 mengukur durasi request (http_req_duration) terpisah untuk tiap scenario yang definisikan (normal, peak, stress)
        // normal: simulasi traffic biasa, harus cepat
        // peak: traffic puncak, bisa lebih lama tapi tetap dibatasi
        // stress: testing limit sistem, toleransi delay lebih tinggi
        'http_req_duration{scenario:normal}': ['p(95)<1500'], // 95% request harus < 1500 ms (1.5 detik)
        'http_req_duration{scenario:peak}': ['p(95)<3000'], // 95% request harus < 3000 ms (3 detik)
        'http_req_duration{scenario:stress}': ['p(95)<5000'], // 95% request harus < 5000 ms (5 detik)

        // Error thresholds per scenario
        // normal: maksimal 1% request boleh gagal
        // peak: maksimal 5% request boleh gagal
        // stress: maksimal 10% request boleh gagal
        'http_req_failed{scenario:normal}': ['rate<0.01'],
        'http_req_failed{scenario:peak}': ['rate<0.05'],
        'http_req_failed{scenario:stress}': ['rate<0.10'],
    },

    scenarios: {
        // ===== SKENARIO 1: Baseline Normal Traffic =====
        normal_user_traffic: {
            executor: 'constant-vus',
            vus: 5,
            duration: '10s',
            exec: 'registerFlow',
            tags: { scenario: 'normal' },
            startTime: '0s'
        },

        // ===== SKENARIO 2: Gradual Peak Traffic =====
        peak_traffic: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                // Dalam 5 detik, naik dari 0 VUs ke 10 VUs.
                { duration: '5s', target: 10 },
                // Selanjutnya 5 detik naik dari 10 VUs ke 15 VUs.
                { duration: '5s', target: 15 },
                // Naik ke 25 VUs dalam 5 detik.
                { duration: '5s', target: 25 },
                // Tetap di 25 VUs selama 5 detik.
                { duration: '5s', target: 25 },
                // Turun dari 25 VUs ke 5 VUs dalam 5 detik.
                { duration: '5s', target: 5 },
                // Turun lagi ke 0 VUs dalam 5 detik (selesai).
                { duration: '5s', target: 0 },
            ],
            exec: 'registerFlow',
            tags: { scenario: 'peak' },
            startTime: '10s', // biar normal_user_traffic selesai dulu
        },

        // ===== SKENARIO 3: Controlled Stress Test =====
        // Mendefinisikan skenario stress test dengan kontrol tingkat kedatangan request (arrival rate)
        stress_test: {
            // Executor yang mengatur jumlah request per waktu (arrival rate) naik turun secara bertahap
            executor: 'ramping-arrival-rate',
            // Mulai dengan 2 iterations (requests) per timeUnit (di sini 1 detik)
            startRate: 2,
            // Satuan waktu untuk startRate dan stages, yaitu 1 detik
            timeUnit: '1s',
            // Jumlah VU yang sudah dialokasikan sebelumnya untuk meng-handle load ini, agar lebih efisien
            preAllocatedVUs: 30,
            // Maksimal virtual users yang boleh digunakan jika load naik melebihi kapasitas preAllocatedVUs
            maxVUs: 50,
            // Tahapan perubahan kedatangan request per detik selama durasi tertentu
            stages: [
                // Dalam 5 detik pertama, tingkat arrival rate dinaikkan dari 2 ke 5 request per detik
                { duration: '5s', target: 5 },
                // Dalam 5 detik berikutnya, naik ke 15 request per detik
                { duration: '5s', target: 15 },
                // Naik ke 30 request per detik selama 5 detik
                { duration: '5s', target: 30 },
                // Naik lagi ke 45 request per detik selama 5 detik (puncak stress)
                { duration: '5s', target: 45 },
                // Turun ke 10 request per detik selama 5 detik sebagai pendinginan (cool down)
                { duration: '5s', target: 10 },
            ],
            exec: 'registerFlow',
            tags: { scenario: 'stress' },
            startTime: '40s', // biar peak_traffic selesai dulu
        },

        // ===== SKENARIO 4: Spike Test =====
        spike_test: {
            executor: 'ramping-vus',
            startVUs: 5,
            stages: [
                { duration: '5s', target: 5 },
                { duration: '5s', target: 40 },
                { duration: '5s', target: 40 },
                { duration: '5s', target: 5 },
            ],
            exec: 'registerFlow',
            tags: { scenario: 'spike' },
            startTime: '65s',
        },

        // ===== SKENARIO 5: Endurance Test =====
        endurance_test: {
            executor: 'constant-vus',
            vus: 8,
            duration: '10s',
            exec: 'registerFlow',
            tags: { scenario: 'endurance' },
            startTime: '75s',
        },
    },

    // ===== GLOBAL SETTINGS =====
    userAgent: 'K6-Laravel-LoadTest/1.0', // dari siap, kalo insomnia beda lagi
    // Jika true, k6 akan **melewati verifikasi sertifikat TLS/SSL** saat melakukan request HTTPS.
    // Biasanya dipakai untuk testing di environment dengan sertifikat self-signed atau tidak valid.
    // Kalau false, k6 akan melakukan verifikasi sertifikat dengan normal.
    insecureSkipTLSVerify: false,

    // Jika true, k6 **tidak akan menggunakan kembali koneksi TCP yang sudah ada** (no keep-alive).
    // Artinya setiap request akan buat koneksi baru ke server.
    // Jika false, koneksi TCP akan dipertahankan dan digunakan ulang (connection reuse).
    noConnectionReuse: false,

    // ===== SUMMARY & REPORTING =====
    // apa aja yang harus di data
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'count'],
    summaryTimeUnit: 'ms',

    // ===== ADVANCED OPTIONS =====
    setupTimeout: '60s',
    teardownTimeout: '60s',

    // biar ngga kena throttle laravel
    rps: 50,
}