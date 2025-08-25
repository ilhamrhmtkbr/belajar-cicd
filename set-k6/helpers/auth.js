import http from 'k6/http';
import { check } from 'k6';

export function register(first_name, middle_name, last_name, username, password, password_confirmation) {
    const url = `http://backend-api-user/user-api/v1/auth/register`;
    const payload = JSON.stringify({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        username: username,
        password: password,
        password_confirmation: password_confirmation,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': 'id'
        },
        tags: { name: 'Register API' },
        timeout: '10s'
    };

    const res = http.post(url, payload, params);
    console.log(res.body);

    check(res, {
        'login success (200)': (r) => r.status === 200 && r.json('success') === true,
    });

    return res;
}