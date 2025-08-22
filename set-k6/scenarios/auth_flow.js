import { group, sleep } from 'k6';
import {register} from "../helpers/auth.js";

function generateLowercaseString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function registerFlow() {
    group('User Register', function () {
       register(
           'Ilham',
           'Rahmat',
           'Akbar',
           'user' + generateLowercaseString(),
           'Ilham123!',
           'Ilham123!'
       );
       sleep(1);
    });
}