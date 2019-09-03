import React, { Component } from 'react'
import './Login.less';
import jsonp from 'jsonp';
const url = 'https://acg.toubiec.cn/random?return=json';
export default class Login extends Component {
    componentDidMount = () => {
        jsonp(url,(data) => {
            /* let bgImg = new Image();
            bgImg.src = data; */
            console.log(data);
            
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
