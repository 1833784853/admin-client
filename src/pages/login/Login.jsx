import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import './Login.less';
import url from './img/bgc.jpg';
class Login extends Component {

    onLoadHandle = (e) => {
        e.target.style.opacity = 1;
    }

    handleSubmit = e => {
        e.preventDefault();
        alert('nihao');
    };

    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <div id="login-wrap">
                <div className="login-header">
                    <h1>React项目：一个用react编制的后台管理系统</h1>
                </div>
                <div id="login-content">
                    <img src={url} alt="bg" onLoad={this.onLoadHandle} />
                    <div className="form-box">
                        <h1>进入新世界</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('userName', {
                                        rules:[
                                            {required: true,whitespace: true, message:'用户名不能为空'},
                                            {min: 4 ,message:'用户名不能少于4位'},
                                            {max: 4,message:'用户名不能大于12位'},
                                            {pattern: /^[0-9A-Za-z_]+$/ ,message:'用户名必须是英文或数字或下划线'}
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />)
                                }
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">进入
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
let WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm;