import axios from 'axios';
import getConfig from 'next/config';
import { DEFAULT_RETRY_BACKOFF, RETRY_CODES } from '@constants/';
const { publicRuntimeConfig } = getConfig();
const { ENV, REACT_APP_ROOT } = publicRuntimeConfig;

const instance = axios.create({
    baseURL: `${REACT_APP_ROOT[ENV]}`
});

export default instance;