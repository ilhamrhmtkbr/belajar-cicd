import {registerFlow} from "../scenarios/auth_flow.js";

export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<5000', 'p(99)<6000'],
        'http_req_failed': ['rate<0.05'],
        'http_reqs': ['rate>5'],
        'checks': ['rate>0.90'],

        'http_req_duration{scenario:normal}': ['p(95)<3000'],
        'http_req_duration{scenario:peak}': ['p(95)<4000'], // toleransi tinggi
        'http_req_duration{scenario:stress}': ['p(95)<5000'], // sistem ditekan
        'http_req_duration{scenario:spike}': ['p(95)<6000'], // lonjakan besar
        'http_req_duration{scenario:endurance}': ['p(95)<3500'], // waktu lama stabil

        'http_req_failed{scenario:normal}': ['rate<0.01'],
        'http_req_failed{scenario:peak}': ['rate<0.05'],
        'http_req_failed{scenario:stress}': ['rate<0.10'],
        'http_req_failed{scenario:spike}': ['rate<0.15'],
        'http_req_failed{scenario:endurance}': ['rate<0.02'],
    },

    scenarios: {
        normal_user_traffic: {
            executor: 'constant-vus',
            vus: 5,
            duration: '10s',
            exec: 'registerFlow',
            tags: { scenario: 'normal' },
            startTime: '0s'
        },

        peak_traffic: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '5s', target: 10 },
                { duration: '5s', target: 15 },
                { duration: '5s', target: 25 },
                { duration: '5s', target: 25 },
                { duration: '5s', target: 5 },
                { duration: '5s', target: 0 },
            ],
            exec: 'registerFlow',
            tags: { scenario: 'peak' },
            startTime: '10s',
        },

        stress_test: {
            executor: 'ramping-arrival-rate',
            startRate: 2,
            timeUnit: '1s',
            preAllocatedVUs: 30,
            maxVUs: 50,
            stages: [
                { duration: '5s', target: 5 },
                { duration: '5s', target: 15 },
                { duration: '5s', target: 30 },
                { duration: '5s', target: 45 },
                { duration: '5s', target: 10 },
            ],
            exec: 'registerFlow',
            tags: { scenario: 'stress' },
            startTime: '40s',
        },

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

        endurance_test: {
            executor: 'constant-vus',
            vus: 8,
            duration: '10s',
            exec: 'registerFlow',
            tags: { scenario: 'endurance' },
            startTime: '75s',
        },
    },

    userAgent: 'K6-Laravel-LoadTest/1.0',
    insecureSkipTLSVerify: false,

    noConnectionReuse: false,

    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'count'],
    summaryTimeUnit: 'ms',
}

export { registerFlow };

export default function () {
    console.log('⚠️  Using default function - consider using scenarios instead');
    registerFlow();
}

export function setup() {
    console.log('🚀 Starting');
    console.log('📊 Scenarios: normal → peak → stress → spike → endurance');
}

export function teardown(data) {
    console.log('🏁 K6 Load Test Completed');
    console.log('📈 Check Prometheus/Grafana for detailed metrics');
}