// 用于内存中储存user的数据
import storageUtils from './storageUtils';
export default {
    user: storageUtils.getUser() //储存user的数据 登录则储存 默认没有登录
}