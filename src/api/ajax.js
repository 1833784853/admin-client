/**
 * 封装 ajax请求函数
 */
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd'
// 请求拦截 用于加工axios发送的post请求体 数据格式 => urlencoded格式
axios.interceptors.request.use(function (config) {
    let { method, data } = config;

    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data);
    }
    return config
})

axios.interceptors.response.use(function (response) {
    if(response.data) {
        return response.data;
    }
    return response
}, function (err) {
    message.error(`请求出错：${err}`);
    return new Promise(()=>{});
})
export default axios;