import ajax from './ajax';

// 发送登录请求
export const reqLogin = (userName, password) => ajax.post('/user/login', { userName, password })
