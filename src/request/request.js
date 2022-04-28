import axios from 'axios'

var service = axios.create({
    // baseURL: 'http://1.14.92.147:8091',
    baseURL: 'http://127.0.0.1:8091',

    timeout: 2000,
    changeOrigin: true,
    headers: {'Content-Type': 'application/json;charset=UTF-8;'}
})

export default service;
