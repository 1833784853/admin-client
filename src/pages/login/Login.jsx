import React, { Component } from 'react'
import './Login.less';
import easyJsonp from 'easy-jsonp';

import axios from 'axios';
const url = 'https://acg.toubiec.cn/random?return=json';
export default class Login extends Component {
    componentDidMount = () => {
        easyJsonp({
            url,
            callback: 'callback',
            timeout: 3000
        }).then((data) => {
            console.log(data);
            
        }).cacth((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div id="login-wrap">
                <div className="login-header">
                    <h1>React项目：一个用react编制的后台管理系统</h1>
                </div>
                <div className="login-content"></div>
            </div>
        )
    }
}
