import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import './index.less';
import memoryUtils from '../../utils/memoryUtils';
import { menuData } from '../config/configMenu';
const { SubMenu } = Menu;
class LeftNav extends Component {
    // 根据menuData中的数据进行遍历返回 <Menu.item> 或者 <subMenu>
    // 采用递归的方式创建多级菜单
    showMenuNav = (menuData) => {
        return menuData.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getdefaultOpenKeys(item)
                        }   
                        {
                            this.showMenuNav(item.children)
                        }
                    </SubMenu>
                )
            }
            return pre;
        }, [])
    }
    getdefaultOpenKeys = (item) => {
        let result = item.children.find(item => item.key === this.props.location.pathname)
        if (result) {
            this.openKeys = item.key
        }
    }
    UNSAFE_componentWillMount () {
        this.menuList = this.showMenuNav(menuData);
    }
    render() {
        const path = this.props.location.pathname
        return (
            <div id="left-nav">
                <div className="user-data-box">
                    <div className="avatar-box">
                        <img src={memoryUtils.user.avatar_url} alt='头像' />
                    </div>
                    <span>{memoryUtils.user.userName}</span>
                </div>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKeys]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuList
                    }


                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav);