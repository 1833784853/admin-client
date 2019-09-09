import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import QueueAnim from 'rc-queue-anim';

import memoryUtils from '../../utils/memoryUtils';
import './Admin.less';
import Header from '../../components/header/Header';
import LeftNav from '../../components/left-nav';
import Home from '../home/Home';
import Category from '../products/Category';
import Product from '../products/Product';
import User from '../user/User';
const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    UNSAFE_componentWillMount() {
        this.clientHeight = document.body.clientWidth;
    }
    componentDidMount = () => {
        let { layout } = this.refs;
        if (!layout) {
            return;
        }
        layout.className = 'active';
    }

    render() {
        let user = memoryUtils.user;
        return (
            <QueueAnim id='layout' animConfig={[
                { opacity:[1,0],translateY: [0, -this.clientHeight] }
            ]}>
                {user._id ? [
                    <Layout ref="layout" key="admin" style={{ height: '100%' }}>
                        <Sider>
                            <LeftNav />
                        </Sider>
                        <Layout>
                            <Header />
                            <Content style={{ backgroundColor: '#fff', margin: '20px', borderRadius: '10px' }}>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/products/product" component={Product} />
                                    <Route path="/products/category" component={Category} />
                                    <Route path="/user" component={User} />
                                    <Redirect to="/home" />
                                </Switch>
                            </Content>
                            <Footer className="footer">使用谷歌浏览器体验为最佳</Footer>
                        </Layout>
                    </Layout>]
                    : [<div key="login"><Redirect to="/login" /></div>]}
            </QueueAnim>
        )
    }
}
