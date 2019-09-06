/**
 * 操作local数据的工具函数
 */
import store from 'store';
const USER_KEY = 'USER_KEY';

 export default {
     saveUser (user) {
         store.set(USER_KEY,user); //储存user数据
     },
     getUser () {
         return store.get(USER_KEY) || {}; // 获取user的数据，如果获取不到则返回一个空对象
     },
     removeUser () {
         store.remove(USER_KEY) 
     }
 }