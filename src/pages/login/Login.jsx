import React, { Component } from 'react'
import './Login.less';
const url = './img/6417838876e128b76ad6cab90ada45a8.jpg';
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
                <div className="login-content">
                    <img src={url} alt="bg" onLoad={this.onLoadHandle}/>
                </div>
            </div>
        )
    }
}
