import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import './Admin.less';
import LeftNav from '../../components/left-nav';
import Home from '../home/Home';
import Category from '../products/Category';
import Product from '../products/Product';
import User from '../user/User';
const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {

    componentDidMount = () => {
        let { layout } = this.refs;
        if (!layout) {
            return;
        }
        let height = document.body.clientWidth;
        layout.style.top = -height + "px";
        layout.className = 'active';
        setTimeout(() => {
            layout.style.top = 0 + "px";
        }, 300);
    }

    render() {
        let user = memoryUtils.user;
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <div ref="layout" id='layout'>
                <Layout style={{ height: '100%' }}>
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/products/product" component={Product}/>
                                <Route path="/products/category" component={Category}/>
                                <Route path="/user" component={User} />
                                <Redirect to="/home"/>
                            </Switch>
                        </Content>
                        <Footer className="footer">使用谷歌浏览器体验为最佳</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
