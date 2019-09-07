/**
 * 把侧边栏的内容数据化
 */
export const menuData = [
    {
        title:'首页',
        key:'/home', //key同时也是路由
        icon:'home',
    },
    {
        title:'商品',
        key:'/products',
        icon:'table',
        children:[
            {
                title:'品类管理',
                key:'/products/category',
                icon:'cluster',
            },
            {
                title:'产品管理',
                key:'/products/product',
                icon:'shopping-cart',
            }
        ]
    },
    {
        title:'用户管理',
        key:'/user', //key同时也是路由
        icon:'user',
    }
]