import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

// Custom metrics untuk Prometheus
const errorRate = new Rate('http_req_error_rate');
const responseTime = new Trend('http_req_duration_custom');
const requestCount = new Counter('http_requests_total');
const activeUsers = new Gauge('active_users');

export let options = {
    vus: 10,
    duration: '30s',

    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.05'],
        http_req_error_rate: ['rate<0.05'],
    },

    tags: {
        testid: 'api-load-test',
        environment: 'development',
    },
};

const BASE_URL = 'http://olcourse-nginx:80/api/v1/public';

export default function () {
    activeUsers.add(1);

    let endpoints = [
        { name: 'courses', path: '/courses' },
        { name: 'courses_page2', path: '/courses?page=2' },
        { name: 'courses_search', path: '/courses?search=programming' },
    ];

    let endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

    let response = http.get(`${BASE_URL}${endpoint.path}`, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'K6-Prometheus-Test',
        },
        tags: {
            endpoint: endpoint.name,
            method: 'GET',
        },
    });

    let checkResult = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
        'response has data': (r) => {
            try {
                let body = JSON.parse(r.body);
                return body.data !== undefined;
            } catch (e) {
                return false;
            }
        },
    }, {
        endpoint: endpoint.name,
    });

    errorRate.add(!checkResult, {
        endpoint: endpoint.name,
    });

    responseTime.add(response.timings.duration, {
        endpoint: endpoint.name,
        status: response.status.toString(),
    });

    requestCount.add(1, {
        endpoint: endpoint.name,
        status: response.status.toString(),
        method: 'GET',
    });

    if (response.status !== 200) {
        console.log(`❌ ${endpoint.name}: Status ${response.status}`);
    }

    sleep(1);
}

export function setup() {
    console.log('🔥 Starting Prometheus-enabled K6 test...');
    console.log(`Target: ${BASE_URL}`);

    let warmup = http.get(`${BASE_URL}/courses`);
    console.log(`Warmup status: ${warmup.status}`);

    return { startTime: new Date().toISOString() };
}

export function teardown(data) {
    console.log('✅ Test completed - Check Prometheus & Grafana!');
    console.log(`Started: ${data.startTime}`);
    console.log('📊 View metrics at:');
    console.log('   - Prometheus: http://localhost:9090');
    console.log('   - Grafana: http://localhost:4000');
}