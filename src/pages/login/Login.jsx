import React, { Component } from 'react'
import './Login.less';
import url from './img/bgc.jpg';
export default class Login extends Component {
    
    onLoadHandle = (e) => {
        e.target.style.opacity = 1;
    }

    render() {
        return (
            <div id="login-wrap">
                <div className="login-header">
                    <h1>React项目：一个用react编制的后台管理系统</h1>
                </div>
                <div id="login-content">
                    <img src={url} alt="bg" onLoad={this.onLoadHandle}/>
                    <div className="form-box">
                        <h1>进入新世界</h1>
                    </div>
                </div>
            </div>
        )
    }
}
