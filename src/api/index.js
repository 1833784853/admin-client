import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
// 发送登录请求
export const reqLogin = (userName, password) => ajax.post('/user/login', { userName, password })

// 发送jsonp获取天气请求
export const reqWeather = (city) => {
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url, {}, (err, data) => {
            if (data.error === 0) {
                let result = {
                    city: data.results[0].currentCity,
                    data: data.results[0].weather_data[0]
                }
                resolve(result)
            } else {
                resolve(data)
            }
            if (err) {
                message.error('获取天气失败！！')
            }
        })
    })
}

// 发送添加分类请求 
export const sendAddCategory = (name) => ajax.post('/products/addCategory', { name })

// 获取分类管理
export const reqGetCategoryList = (page, pageSize) => ajax.get('/products/getCategorys', { page, pageSize })


// 发送修改分类数据的请求
export const sendUpdataCategory = (id, name) => ajax.post('/products/updataCategory', { id, name })