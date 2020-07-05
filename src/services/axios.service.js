import axios from 'axios';
import getConfig from 'next/config';
import { DEFAULT_RETRY_BACKOFF, RETRY_CODES } from '@constants/';
const { publicRuntimeConfig } = getConfig();
const { ENV, REACT_APP_ROOT } = publicRuntimeConfig;

const instance = axios.create({
    baseURL: `${REACT_APP_ROOT[ENV]}`
});

const sleepRequest = (milliseconds, originalRequest) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(instance(originalRequest)), milliseconds);
    });
};

instance.interceptors.response.use(response => {
    return response;
}, error => {
    const { config, response: { status }} = error;
    const originalRequest = config;

    if (RETRY_CODES.includes(status)) {
        console.log(`\n\n\n status`,status)
        console.log('error.response.headers',error.response.headers)
        console.log('Retry-After Header',error.response.headers['Retry-After'])
        // return sleepRequest(DEFAULT_RETRY_BACKOFF, originalRequest);
    } else {
        return Promise.reject(error);
    }
});

export default instance;